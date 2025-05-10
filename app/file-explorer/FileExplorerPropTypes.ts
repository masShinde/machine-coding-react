
export interface FileFormat{
    name: string,
    type: 'folder' | 'file';
    isExpanded?: boolean;
    children: Record<string, FileFormat>;
    path: string;
}

export interface FileExplorerPropTypes{
    data : Record<string, FileFormat>
}