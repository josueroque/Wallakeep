import * as Types from '../types';
import {getTagsAction} from './tagsActions';
import getTags from '../Api/Api';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
jest.mock('../Api/Api');
const middlewares = [thunk.withExtraArgument()];
const mockStore = configureStore(middlewares);
const store = mockStore({});
describe.skip('actions', () => {
  
    describe('getTagsAction', () => {
      const tags=['motor','mobile'];  
      const error = 'Error getting tags';
      getTags
        .mockResolvedValueOnce(tags)
        .mockRejectedValueOnce(error);
  
      beforeEach(() => {
        store.clearActions();
      });
  
      describe('when getTags resolves', () => {
        it('should dispatch a START_GET_TAGS and a GET_TAGS_SUCCESS actions', async () => {
          const expectedActions = [
            {
              type: Types.START_GET_TAGS,
            },
            {
              type: Types.GET_TAGS_SUCCESS,
              tags,
            },
          ];
          await store.dispatch(getTagsAction());
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
  
      describe('when getTags rejects', () => {
        it('should dispatch a START_GET_TAGS and a GET_TAGS_FAILURE actions', async () => {
          const expectedActions = [
            {
              type: Types.START_GET_TAGS,
            },
            {
              type: Types.GET_TAGS_FAILURE,
              error,
            },
          ];
          await store.dispatch(getTagsAction());
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
  
    });
});
