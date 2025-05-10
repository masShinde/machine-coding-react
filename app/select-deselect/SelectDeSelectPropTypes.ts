
export interface Box{
    isSelected: boolean;
    currentIndex: number;
    activeColor: string;
    inActiveColor: string;
}

export interface SelectDeSelectPropTypes{
    data: Array<Array<Box>>
}