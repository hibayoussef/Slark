import {Workspace} from "../../workspaces/types/workspace";

export interface Space{
    _id: string;
    name: string;
    _workspace: Workspace;
}


