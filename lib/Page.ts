import { RouterLocation } from 'direct-react-router';
// import { Action, Reducer } from 'redux';

export interface Page<T> {
// export interface Page<TStore, TAction extends Action> {
    route: string;
    component: any;
    getData?: (location: RouterLocation) => Promise<T>;
    // rootReducer: Reducer<TStore, TAction>
}
