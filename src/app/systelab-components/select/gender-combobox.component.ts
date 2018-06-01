import { AbstractComboBox } from '../combobox/abstract-combobox.component';
import { Component, Renderer2, EventEmitter, Output, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';

class Element {
	constructor( public id: string, public description: string ) {

	}
}

@Component( {
	selector:    'systelab-gender-select',
	templateUrl: '../combobox/abstract-combobox.component.html'
} )

export class GenderSelect extends AbstractComboBox implements AfterViewInit {

	@Input() showAll = false;
	@Input() genderValue = '';
	@Output() genderValueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

	constructor( public myRenderer: Renderer2, public chRef: ChangeDetectorRef, public i18nService: I18nService ) {
		super( myRenderer, chRef );
	}

	public ngAfterViewInit() {
		this.values = new Array<Element>();
		if ( this.showAll ) {
			this.values.push( new Element( 'A', this.i18nService.instant( 'COMMON_ALL' ) ) );
		}
		this.values.push( new Element( 'U', this.i18nService.instant( 'COMMON_UNKNOWN' ) ) );
		this.values.push( new Element( 'M', this.i18nService.instant( 'COMMON_MALE' ) ) );
		this.values.push( new Element( 'F', this.i18nService.instant( 'COMMON_FEMALE' ) ) );

		if ( !this._id ) {
			if ( this.showAll ) {
				this._id = 'A';
				this._description = this.i18nService.instant( 'COMMON_ALL' );
			} else {
				this._id = 'U';
				this._description = this.i18nService.instant( 'COMMON_UNKNOWN' );
			}
		}
		this.gridOptions.rowData = this.values;
	}
}
