import { Injectable } from '@angular/core';

@Injectable()
export class ColorUtilService {

	public static generateColorArray( colorValues: Array<any>, withBorder?: boolean ): Array<any> {
		const colorList = [];

		for ( const colorR of colorValues ) {
			for ( const colorG of colorValues ) {
				for ( const colorB of colorValues ) {
					const newColorElement: any = {};
					newColorElement.color = '#' + this.rgbToHex( colorR, colorG, colorB );
					if ( withBorder ) {
						newColorElement.border = '#' + this.darkColor( colorR, colorG, colorB );
					}
					newColorElement.id = newColorElement.color;
					newColorElement.value = newColorElement.color;
					colorList.push( newColorElement );
				}
			}
		}
		return colorList;
	}

	public static rgbToHex( R: any, G: any, B: any ) {
		return this.toHex( R ) + this.toHex( G ) + this.toHex( B );
	}

	private static toHex( n: any ) {
		n = parseInt( n, 10 );
		if ( isNaN( n ) ) {
			return '00';
		}
		n = Math.max( 0, Math.min( n, 255 ) );
		return '0123456789ABCDEF'.charAt( (n - n % 16) / 16 ) + '0123456789ABCDEF'.charAt( n % 16 );
	}

	public static hexToRGB( hex: string ) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
		return result ? {
			r: parseInt( result[1], 16 ),
			g: parseInt( result[2], 16 ),
			b: parseInt( result[3], 16 )
		} : null;
	}

	public static darkColorFromHex( hex: string ) {
		const rgbColor = this.hexToRGB( hex );
		return this.darkColor( rgbColor.r, rgbColor.g, rgbColor.b );
	}

	public static darkColor( R: any, G: any, B: any ) {
		return this.rgbToHex( R * 0.7, G * 0.7, B * 0.7 );
	}

}
