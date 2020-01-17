import * as Types from '../types';
import {saveAdSuccess} from './adsActions';

describe('actions',()=>{
    describe('saveAdSuccess',()=> {
        it('should create and SAVE_AD_SUCCESS action',()=>{
            const ads={
             name:'Anuncio de prueba',
             description:'prueba',
             price:100,
             type:'sell',
             tags:['motor'],
             photo:''
            };
            const expectedAction={
                type: Types.SAVE_AD_SUCCESS,
                payload:ads
            };
        
        expect(saveAdSuccess(ads)).toEqual(expectedAction);
        });
    });
});

