
export interface WorkspaceAuthor {
    id: string;
    name: string;
}


export interface WorkspaceLogo {
    id: string;
    avatar: string;
    src: string;
}

export interface Workspace {
    id: string;
    title: string;
    author: WorkspaceAuthor;
    logo: WorkspaceLogo;
    membersCount?: number;
    updatedAt: number;
}
