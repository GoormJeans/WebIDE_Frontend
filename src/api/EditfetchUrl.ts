const requests : {
    fetchFiletree : string
    delete : string,
    create : string,
    modify : string,

    sourcecode : string,
    getprob : string,
    execute : string,
    submit : string,
} = {
    fetchFiletree : 'editor/filetrees/',
    delete : 'editor/delete',
    create : 'editor/filecreate',
    modify : 'editor/modification',
    sourcecode : 'editor/sourcecode',   //post
    getprob : 'editor/algorithm/',  //get
    execute : 'editor/execute', //post  
    submit : '/editor/submit',
};

export default requests;