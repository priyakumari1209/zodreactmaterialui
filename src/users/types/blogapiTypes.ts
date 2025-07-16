type Create = {
    variant: 'create';
};

type Edit = {
    variant: 'edit';
    id: number;
};

export type ApiCommon = {
    title: string[];
    description: string[];
    contect: string[];
    
};


export type ApiCreateEdit = ApiCommon & (Create | Edit);
export type ApiGet = Edit & ApiCommon;