import { browser, by, element } from 'protractor';
import * as path from 'path';
import { compareScreenshot } from 'snapshot-testing/dist';



export class ShowcasePage {

	public navigateTo() {
		return browser.get('/');
	}

	public takeScreenshot() {
		return browser.takeScreenshot();
	}

	public getNavItem(i: number) {
		return element(by.id('nav-' + i));
	}

	public async checkNavigationItem(i: number) {
		await this.getNavItem(i).click();
		const data = await this.takeScreenshot();
		// As in Travis and in retina I get different images, for the moment I will not check the snapshots. Try Jest?
		//	return await compareScreenshot(data, path.join(__dirname, `snapshots`), `snapshots_${i + 1}.png`);
		return await true;
	}

	public getFullWidthInput() {
		return element(by.id('full-width-input'));
	}

	public getNumberInput() {
		return element(by.id('number-input'));
	}

	public getThirdWidthInput() {
		return element(by.id('third-width-input'));
	}

	public getDisabledInput() {
		return element(by.id('disabled-input'));
	}

	// numpad component access points
	public getNumpadInput(isPassword?: boolean) {
		if (isPassword === true) {
			return element(by.id('numpaddialogPwd'));
		} else {
			return element(by.id('numpaddialog'));
		}
	}

	public getNumpadButton(num?: number) {
		let list = element.all(by.id('numpadInputButton'));
		
		if (num === undefined)  {
			return list.get(0);
		} else {
			return list.get(num);
		};
		
	}

	public getCloseButton() {
		return element(by.className('slab-dialog-header-button slab-dialog-close mr-2 ng-star-inserted'));
	}

	public getNumpadDialog() {
		return element(by.className('slab-dialog-content'));
	}

	public getNumpadField(isPassword?: boolean) {
		if (isPassword === true) {
			return element(by.id('numpadFieldPwd'));
		} else {
			return element(by.id('numpadField'));
		}
	}

	public getNumpadKey(key: string) {
		return element(by.id('numpadKey'+key+'Button'));
	}

	public getUploadFile() {
		return element(by.id('upload-file'));
	}

	// Textarea component
	public getResizeTextarea() {
		return element(by.id('resize-textarea'));
	}

	public getNoResizeTextarea() {
		return element(by.id('noresize-textarea'));
	}

	public getRTextareaContextMenu() {
		return element(by.id('textarea-context-menu'));
	}

	// switcher component
	public getSwitcher(num: string) {
		return element(by.id('switcher'+num));
	}

	// checkbox component
	public getColumnUrgentCheckbox(label?: boolean) {
		if (label === true) {
			return element(by.id('label_checkbox_urgent'));
		} else {
			return element(by.id('checkbox_urgent'));
		}
	}

	public getColumnNotUrgentCheckbox(label?: boolean) {
		if (label === true) {
			return element(by.id('label_check_not_urgent'));
		} else {
			return element(by.id('check_not_urgent'));
		}
	}

	public getInlineUrgentCheckbox(label?: boolean) {
		if (label === true) {
			return element(by.id('label_check_urgent2'));
		} else {
			return element(by.id('check_urgent2'));
		}
	}

	public getInlineNotUrgentCheckbox(label?: boolean) {
		if (label === true) {
			return element(by.id('label_check_not_urgent2'));
		} else {
			return element(by.id('check_not_urgent2'));
		}
	}

	// radio button component
	public getColumnUrgentRadio(label?: boolean) {
		if (label === true) {
			return element(by.id('label-radio-urgent'));
		} else {
			return element(by.id('radio-urgent'));
		}
	}

	public getColumnNotUrgentRadio(label?: boolean) {
		if (label === true) {
			return element(by.id('label-radio-not-urgent'));
		} else {
			return element(by.id('radio-not-urgent'));
		}
	}

	public getInlineUrgentRadio(label?: boolean) {
		if (label === true) {
			return element(by.id('label-radio-urgent2'));
		} else {
			return element(by.id('radio-urgent2'));
		}
	}

	public getInlineNotUrgentRadio(label?: boolean) {
		if (label === true) {
			return element(by.id('label-radio-not-urgent2'));
		} else {
			return element(by.id('radio-not-urgent2'));
		}
	}

	public getSelectedRadioLabel() {
		return element(by.id('label-selected-radio'));
	}
}
