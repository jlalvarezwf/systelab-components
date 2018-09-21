import { ShowcasePage } from '../app.po';
import { protractor } from 'protractor';

describe('systelab-components: Numpad Testing', () => {
    let page: ShowcasePage = new ShowcasePage();
    const prevValue = '123456';
    const newValue = '25847';

    it('Numpad input: entering numbers', async() => {
        await page.navigateTo();
        
        await expect(page.getNumpadInput().isPresent()).toBe(true);
        await expect(page.getNumpadInput().isDisplayed()).toBe(true);
        
        // entering only numbers directly into input field
        await page.getNumpadInput().clear();
        await page.getNumpadInput().sendKeys('15264879');
        await expect(page.getNumpadInput().getAttribute('value')).toEqual('15264879');
        
        // the same in the password-type numpad
        await page.getNumpadInput(true).clear();
        await page.getNumpadInput(true).sendKeys('15264879');
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual('15264879');
    });
    it('Numpad input: entering numbers and letters', async() => {
        // entering numbers and letters directly into input field
        await page.getNumpadInput().clear();
        await page.getNumpadInput().sendKeys('15a26b48c79d');
        await expect(page.getNumpadInput().getAttribute('value')).toEqual('15a26b48c79d');

        // the same in the password-type numpad
        await page.getNumpadInput(true).clear();
        await page.getNumpadInput(true).sendKeys('15a26b48c79d');
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual('15a26b48c79d');
    });
    it('Numpad input: enetring numbers, letters and symbols', async() => {
        await page.getNumpadInput().clear();
        await page.getNumpadInput().sendKeys('1.5a,2_6b@\'4%8(c)7<9*d4\"6-');
        await expect(page.getNumpadInput().getAttribute('value')).toEqual('1.5a,2_6b@\'4%8(c)7<9*d4\"6-'); // work
        
        // the same in the password-type numpad
        await page.getNumpadInput(true).clear();
        await page.getNumpadInput(true).sendKeys('1.5a,2_6b@\'4%8(c)7<9*d4\"6-');
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual('1.5a,2_6b@\'4%8(c)7<9*d4\"6-'); 
    });
    it('Numpad input: open numpad dialog with previous value', async() => {
        // alternative to element.clear() 
        await page.getNumpadInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadInput().sendKeys('1.5a,2_6b@\'4%8(c)7<9*d4\"6-');
        await expect(page.getNumpadInput().getAttribute('value')).toEqual('1.5a,2_6b@\'4%8(c)7<9*d4\"6-');
        await page.getNumpadButton().click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('1.5a,2_6b@\'4%8(c)7<9*d4\"6-');
        await page.getNumpadKey('OK').click();

        // the same in the password-type numpad
        await page.getNumpadInput(true).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadInput(true).sendKeys('1.5a,2_6b@\'4%8(c)7<9*d4\"6-');
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual('1.5a,2_6b@\'4%8(c)7<9*d4\"6-');
        await page.getNumpadButton(1).click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('1.5a,2_6b@\'4%8(c)7<9*d4\"6-');
        await page.getNumpadKey('OK').click();
    });
    it('Numpad input: open numpad dialog without previous value', async() => {
        // alternative to element.clear() 
        await page.getNumpadInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await expect(page.getNumpadInput().getText()).toEqual('');
        await expect(page.getNumpadInput().getAttribute('value')).toEqual('');
        await page.getNumpadButton(0).click();
        await expect(page.getNumpadField().getText()).toEqual(''); 
        await expect(page.getNumpadField().getAttribute('value')).toEqual('');
        await page.getCloseButton().click();

        // the same in the password-type numpad
        await page.getNumpadInput(true).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await expect(page.getNumpadInput(true).getText()).toEqual('');
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual('');
        await page.getNumpadButton(1).click();
        await expect(page.getNumpadField(true).getText()).toEqual(''); 
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('');
        await page.getCloseButton().click();
    });
    it('Numpad dialog: using numpad keys', async() => {
        // using numpad keys
        await page.getNumpadButton().click();
        await page.getNumpadKey('0').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0');
        await page.getNumpadKey('1').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('01');
        await page.getNumpadKey('2').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('012');
        await page.getNumpadKey('3').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0123');
        await page.getNumpadKey('4').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('01234');
        await page.getNumpadKey('5').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('012345');
        await page.getNumpadKey('6').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0123456');
        await page.getNumpadKey('7').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('01234567');
        await page.getNumpadKey('8').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('012345678');
        await page.getNumpadKey('9').click();        
        // await expect(page.getNumpadField().getText()).toEqual('0123456789'); // doesn't work
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0123456789');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('012345678');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('01234567');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0123456');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('012345');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('01234');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0123');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('012');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('01');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField().getAttribute('value')).toEqual('');
        await page.getCloseButton().click();

        // the same in the password-type numpad
        await page.getNumpadButton(1).click();
        await page.getNumpadKey('0').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0');
        await page.getNumpadKey('1').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('01');
        await page.getNumpadKey('2').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('012');
        await page.getNumpadKey('3').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0123');
        await page.getNumpadKey('4').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('01234');
        await page.getNumpadKey('5').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('012345');
        await page.getNumpadKey('6').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0123456');
        await page.getNumpadKey('7').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('01234567');
        await page.getNumpadKey('8').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('012345678');
        await page.getNumpadKey('9').click();                
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0123456789');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('012345678');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('01234567');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0123456');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('012345');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('01234');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0123');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('012');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('01');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0');
        await page.getNumpadKey('Del').click();
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('');
        await page.getCloseButton().click();
    });
    it('Numpad dialog: using keyboard keys', async() => {
        // using the keyboard and the cursor arrows
        await page.getNumpadButton().click();
        await page.getNumpadField().sendKeys('0', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0');
        await page.getNumpadField().sendKeys('1', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('10');
        await page.getNumpadField().sendKeys('2', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('210');
        await page.getNumpadField().sendKeys('3', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('3210');
        await page.getNumpadField().sendKeys('4', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('43210');
        await page.getNumpadField().sendKeys('5', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('543210');
        await page.getNumpadField().sendKeys('6', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('6543210');
        await page.getNumpadField().sendKeys('7', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('76543210');
        await page.getNumpadField().sendKeys('8', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('876543210');
        await page.getNumpadField().sendKeys('9', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('9876543210');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('876543210');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('76543210');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('6543210');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('543210');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('43210');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('3210');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('210');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('10');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('0');
        await page.getNumpadField().sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField().getAttribute('value')).toEqual('');
        await page.getCloseButton().click();

        // the same in the password-type numpad
        await page.getNumpadButton(1).click();
        await page.getNumpadField(true).sendKeys('0', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0');
        await page.getNumpadField(true).sendKeys('1', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('10');
        await page.getNumpadField(true).sendKeys('2', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('210');
        await page.getNumpadField(true).sendKeys('3', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('3210');
        await page.getNumpadField(true).sendKeys('4', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('43210');
        await page.getNumpadField(true).sendKeys('5', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('543210');
        await page.getNumpadField(true).sendKeys('6', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('6543210');
        await page.getNumpadField(true).sendKeys('7', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('76543210');
        await page.getNumpadField(true).sendKeys('8', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('876543210');
        await page.getNumpadField(true).sendKeys('9', protractor.Key.ARROW_LEFT);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('9876543210');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('876543210');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('76543210');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('6543210');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('543210');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('43210');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('3210');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('210');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('10');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('0');
        await page.getNumpadField(true).sendKeys(protractor.Key.DELETE);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual('');
        await page.getCloseButton().click();
    });
    it('Numpad dialog: exit (ESC key) dialog without sending last value', async() => {
        await page.getNumpadButton().click();
        await page.getNumpadKey('OK').click();        
        await page.getNumpadInput().sendKeys(prevValue);
        await expect(page.getNumpadInput().getAttribute('value')).toEqual(prevValue);
        await page.getNumpadButton().click();
        await page.getNumpadField().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadField().sendKeys(newValue);
        await expect(page.getNumpadField().getAttribute('value')).toEqual(newValue);
        await page.getNumpadField().sendKeys(protractor.Key.ESCAPE); // exit from dialog
        await expect(page.getNumpadInput().getAttribute('value')).toEqual(prevValue);
        

        // the same in the password-type numpad
        await page.getNumpadButton(1).click();
        await page.getNumpadKey('OK').click();        
        await page.getNumpadInput(true).sendKeys(prevValue);
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual(prevValue);
        await page.getNumpadButton(1).click();
        await page.getNumpadField(true).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadField(true).sendKeys(newValue);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual(newValue);
        await page.getNumpadField(true).sendKeys(protractor.Key.ESCAPE); // exit from dialog
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual(prevValue);
        
    });
    it('Numpad dialog: exit (EXIT button) dialog without sending last value', async() => {
        await page.getNumpadInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadInput().sendKeys(prevValue);
        await expect(page.getNumpadInput().getAttribute('value')).toEqual(prevValue);
        await page.getNumpadButton().click();
        await page.getNumpadField().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadField().sendKeys(newValue);
        await expect(page.getNumpadField().getAttribute('value')).toEqual(newValue);
        await page.getCloseButton().click(); // exit from dialog
        await expect(page.getNumpadInput().getAttribute('value')).toEqual(prevValue);

        // the same in the password-type numpad
        await page.getNumpadInput(true).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadInput(true).sendKeys(prevValue);
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual(prevValue);
        await page.getNumpadButton(1).click();
        await page.getNumpadField(true).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadField(true).sendKeys(newValue);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual(newValue);
        await page.getCloseButton().click(); // exit from dialog
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual(prevValue);
    });
    it('Numpad dialog: exit (OK key) dialog sending last value', async() => {
        await page.getNumpadInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadInput().sendKeys(prevValue);
        await expect(page.getNumpadInput().getAttribute('value')).toEqual(prevValue);
        await page.getNumpadButton().click();
        await page.getNumpadField().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadField().sendKeys(newValue);
        await expect(page.getNumpadField().getAttribute('value')).toEqual(newValue);
        await page.getNumpadKey('OK').click();
        await expect(page.getNumpadInput().getAttribute('value')).toEqual(newValue);

        // the same in the password-type numpad
        await page.getNumpadInput(true).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadInput(true).sendKeys(prevValue);
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual(prevValue);
        await page.getNumpadButton(1).click();
        await page.getNumpadField(true).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
        await page.getNumpadField(true).sendKeys(newValue);
        await expect(page.getNumpadField(true).getAttribute('value')).toEqual(newValue);
        await page.getNumpadKey('OK').click();
        await expect(page.getNumpadInput(true).getAttribute('value')).toEqual(newValue);
    });
})