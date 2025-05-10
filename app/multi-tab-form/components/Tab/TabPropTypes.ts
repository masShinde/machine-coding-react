export interface TabPropTypes{
    tabName: string;

    tabKey: string;

    onTabChangeHandler?: (tabName: string) => void;

    index: string | number;
}