import { ShowcasePage } from '../app.po';
import { protractor } from 'protractor/built/ptor';
import { sample } from 'rxjs/operators';
import { browser } from 'protractor';

describe('systelab-components: Input Component Testing', () => {
    let page: ShowcasePage = new ShowcasePage();
    const sampleText: string = 'This is a sample text we are going to use, in order to populate the input components whenever it is needed to.';
    const sampleParagraph: string = sampleText + ' ' + sampleText + ' ' + sampleText + ' ' + sampleText + ' ' + sampleText + ' ' + sampleText;
    const numDeletedChars: number = 30;
    const deletedParagraph: string = sampleParagraph.substring(0, sampleParagraph.length - numDeletedChars);
    

    it('Check first tab -> Form Components Tab', async() => {
        await page.navigateTo().then(() => {
            expect(page.getNavItem(0).isPresent()).toBe(true);
            expect(page.getNavItem(0).isDisplayed()).toBe(true);
        });
    });
    it('Check input component: Full Width', async() => {
        await page.getFullWidthInput().isPresent().then((iPresent) => {
            if (iPresent === true) {
                expect(page.getFullWidthInput().isDisplayed()).toBe(true);
            } else {
                fail('input-full-width not present');
            }
        });        
    }); 
    it('Check input component: Number Input', async() => {
        expect(page.getNumberInput().isPresent()).toBe(true);
        expect(page.getNumberInput().isDisplayed()).toBe(true);
        
        // number and letters, forming a scientific notation number (depends on the sequence)
        await page.getNumberInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumberInput().sendKeys('1abcdef2s');
        await expect(page.getNumberInput().getAttribute('value')).toEqual('1e2');
        await expect(page.getNumberInput().getAttribute('valueAsNumber')).toEqual('100');

        await page.getNumberInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumberInput().sendKeys('1abcdef2szae');
        await expect(page.getNumberInput().getAttribute('value')).toEqual('');
        await expect(page.getNumberInput().getAttribute('valueAsNumber')).toEqual('NaN');
        
        // type in only letters, won't be displayed
        await page.getNumberInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumberInput().sendKeys('abcde');
        await expect(page.getNumberInput().getAttribute('value')).toEqual('');
        await expect(page.getNumberInput().getAttribute('valueAsNumber')).toEqual('NaN');

        // type in only numbers, they'll be all displayed
        await page.getNumberInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumberInput().sendKeys('1234567890');
        await expect(page.getNumberInput().getAttribute('value')).toEqual('1234567890');
        await expect(page.getNumberInput().getAttribute('valueAsNumber')).toEqual('1234567890');

        // type in numbers with letters and symbols, won't be displayed (depending on the sequence)
        await page.getNumberInput().clear();
        await page.getNumberInput().sendKeys('1-a,3.4%8¿1|93;_5');
        await expect(page.getNumberInput().getAttribute('value')).toEqual('');
        await expect(page.getNumberInput().getAttribute('valueAsNumber')).toEqual('NaN');

        await page.getNumberInput().clear();
        await page.getNumberInput().sendKeys('-c3a.b4d%€');
        await expect(page.getNumberInput().getAttribute('value')).toEqual('-3.4');
        await expect(page.getNumberInput().getAttribute('valueAsNumber')).toEqual('-3.4');

        await page.getNumberInput().clear();
        await page.getNumberInput().sendKeys('+c23a,b7d%€');
        await expect(page.getNumberInput().getAttribute('value')).toEqual('23.7');
        await expect(page.getNumberInput().getAttribute('valueAsNumber')).toEqual('23.7');
    });
    it('Check input component: Third Width', async () => {
        await expect(page.getThirdWidthInput().isPresent()).toBe(true);
        await expect(page.getThirdWidthInput().isDisplayed()).toBe(true);     
    });
    it('Check input component: Disabled Input', async () => {
        await expect(page.getDisabledInput().isPresent()).toBe(true);
        await expect(page.getDisabledInput().isDisplayed()).toBe(true);
    });
    // Numpad component (it has its own spec file)
    // File selector (yet to do)
    // Textarea
    it('Textarea: adding text to the component', async() => {

        await expect(page.getResizeTextarea().isPresent()).toBe(true);
        await expect(page.getResizeTextarea().isDisplayed()).toBe(true);
        await expect(page.getNoResizeTextarea().isPresent()).toBe(true);
        await expect(page.getNoResizeTextarea().isDisplayed()).toBe(true);

        await page.getResizeTextarea().clear();
        await page.getResizeTextarea().sendKeys(sampleParagraph);
        await expect(page.getResizeTextarea().getAttribute('value')).toEqual(sampleParagraph);

        // the same for the no-resizable textarea
        await page.getNoResizeTextarea().clear();
        await page.getNoResizeTextarea().sendKeys(sampleParagraph);
        await expect(page.getNoResizeTextarea().getAttribute('value')).toEqual(sampleParagraph);
    });
    it('Textarea: deleting text from the component', async() => {
        for(let i = 0; i < numDeletedChars; i++) {
            await page.getResizeTextarea().sendKeys(protractor.Key.BACK_SPACE);
        }
        await expect(page.getResizeTextarea().getAttribute('value')).toEqual(deletedParagraph);

        // the same for the no-resizable textarea
        for(let i = 0; i < numDeletedChars; i++) {
            await page.getNoResizeTextarea().sendKeys(protractor.Key.BACK_SPACE);
        }
        await expect(page.getNoResizeTextarea().getAttribute('value')).toEqual(deletedParagraph);
    });
    it('Textarea: Copy+Paste text', async() => {
        await page.getResizeTextarea().clear();
        await page.getResizeTextarea().sendKeys(sampleText);        
        await page.getResizeTextarea().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', 'c'));
        await page.getResizeTextarea().clear();
        await page.getResizeTextarea().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'v'));
        await expect(page.getResizeTextarea().getAttribute('value')).toEqual(sampleText);

        // the same for the no-resizable textarea
        await page.getNoResizeTextarea().clear();
        await page.getNoResizeTextarea().sendKeys(sampleText);        
        await page.getNoResizeTextarea().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', 'c'));
        await page.getNoResizeTextarea().clear();
        await page.getNoResizeTextarea().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'v'));
        await expect(page.getNoResizeTextarea().getAttribute('value')).toEqual(sampleText);
    });
    it('Textarea: Access to context menu', async() => {
        await browser.actions().mouseMove(page.getResizeTextarea()).perform();
        await browser.actions().click(protractor.Button.RIGHT).perform();
        await expect(page.getRTextareaContextMenu().isPresent()).toBe(true);
        await expect(page.getRTextareaContextMenu().isDisplayed()).toBe(true);
        
        // more test on accessing menu items.
    });
    // Searcher (yet to do)
    // Checkbox
    it('Switcher: Access to value and toggle', async() => {
        // expect default values
        await expect(page.getSwitcher('1').getAttribute('ng-reflect-disabled')).toEqual(null);
        await expect(page.getSwitcher('1').getAttribute('ng-reflect-is-checked')).toEqual('false');
        await expect(page.getSwitcher('2').getAttribute('ng-reflect-disabled')).toEqual('true');
        await expect(page.getSwitcher('2').getAttribute('ng-reflect-is-checked')).toEqual('false');
        await expect(page.getSwitcher('3').getAttribute('ng-reflect-disabled')).toEqual('true');
        await expect(page.getSwitcher('3').getAttribute('ng-reflect-is-checked')).toEqual('true');

        // change value in enabled switcher
        await page.getSwitcher('1').click();
        await expect(page.getSwitcher('1').getAttribute('ng-reflect-is-checked')).toEqual('true');
        await page.getSwitcher('1').click();
        await expect(page.getSwitcher('1').getAttribute('ng-reflect-is-checked')).toEqual('false');

        // try to change in disble switcher
        await page.getSwitcher('2').click();
        await expect(page.getSwitcher('2').getAttribute('ng-reflect-is-checked')).toEqual('false');
        await page.getSwitcher('2').click();
        await expect(page.getSwitcher('2').getAttribute('ng-reflect-is-checked')).toEqual('false');
    });
    it('Checkbox: Access to value and toggle', async() => {
        // expect default values
        await expect(page.getColumnUrgentCheckbox().getAttribute('checked')).toEqual(null);
        await expect(page.getColumnNotUrgentCheckbox().getAttribute('checked')).toEqual('true');
        await expect(page.getInlineUrgentCheckbox().getAttribute('checked')).toEqual(null);
        await expect(page.getInlineNotUrgentCheckbox().getAttribute('checked')).toEqual('true');

        // change values
        await page.getColumnUrgentCheckbox(true).click();
        await expect(page.getColumnUrgentCheckbox().getAttribute('checked')).toEqual('true');
        await page.getColumnUrgentCheckbox(true).click();
        await expect(page.getColumnUrgentCheckbox().getAttribute('checked')).toEqual(null);
        await page.getColumnNotUrgentCheckbox(true).click();
        await expect(page.getColumnNotUrgentCheckbox().getAttribute('checked')).toEqual(null);
        await page.getColumnNotUrgentCheckbox(true).click();
        await expect(page.getColumnNotUrgentCheckbox().getAttribute('checked')).toEqual('true');
        await page.getInlineUrgentCheckbox(true).click();
        await expect(page.getInlineUrgentCheckbox().getAttribute('checked')).toEqual('true');
        await page.getInlineUrgentCheckbox(true).click();
        await expect(page.getInlineUrgentCheckbox().getAttribute('checked')).toEqual(null);
        await page.getInlineNotUrgentCheckbox(true).click();
        await expect(page.getInlineNotUrgentCheckbox().getAttribute('checked')).toEqual(null);
        await page.getInlineNotUrgentCheckbox(true).click();
        await expect(page.getInlineNotUrgentCheckbox().getAttribute('checked')).toEqual('true');
    });
    // Radio
    it('Radio Button: Access to value and toggle', async() => {
        // expect default values
        await expect(page.getColumnUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getColumnNotUrgentRadio().getAttribute('checked')).toEqual('true');
        await expect(page.getInlineUrgentRadio().getAttribute('checked')).toEqual('true');
        await expect(page.getInlineNotUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getSelectedRadioLabel().getText()).toEqual('Selected urgent');

        // change values 
        await page.getColumnUrgentRadio(true).click();
        await expect(page.getColumnUrgentRadio().getAttribute('checked')).toEqual('true');
        await expect(page.getColumnNotUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getInlineUrgentRadio().getAttribute('checked')).toEqual('true');
        await expect(page.getInlineNotUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getSelectedRadioLabel().getText()).toEqual('Selected urgent');
        await page.getColumnNotUrgentRadio(true).click();
        await expect(page.getColumnUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getColumnNotUrgentRadio().getAttribute('checked')).toEqual('true');
        await expect(page.getInlineUrgentRadio().getAttribute('checked')).toEqual('true');
        await expect(page.getInlineNotUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getSelectedRadioLabel().getText()).toEqual('Selected urgent');
        await page.getInlineNotUrgentRadio(true).click();
        await expect(page.getInlineUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getInlineNotUrgentRadio().getAttribute('checked')).toEqual('true');
        await expect(page.getSelectedRadioLabel().getText()).toEqual('Selected no-urgent');
        await expect(page.getColumnUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getColumnNotUrgentRadio().getAttribute('checked')).toEqual('true');
        await page.getInlineUrgentRadio(true).click();
        await expect(page.getInlineUrgentRadio().getAttribute('checked')).toEqual('true');
        await expect(page.getInlineNotUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getSelectedRadioLabel().getText()).toEqual('Selected urgent');
        await expect(page.getColumnUrgentRadio().getAttribute('checked')).toEqual(null);
        await expect(page.getColumnNotUrgentRadio().getAttribute('checked')).toEqual('true');
    });
    // Combobox (yet to do)
    // Listbox (yet to do)
    // Form Inline (yet to do)
    // Sortable List (yet to do)
    // Add Remove List (yet to do)
})
