// import { Action, Reducer } from 'redux';

export interface Page {
// export interface Page<TStore, TAction extends Action> {
    route: string;
    component: any;
    // getData: () => Promise<TStore>;
    // rootReducer: Reducer<TStore, TAction>
}
