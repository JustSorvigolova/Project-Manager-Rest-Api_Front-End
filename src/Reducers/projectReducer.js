import {projectsAPI} from "../Api/api";
const ERROR = 'project/ERROR'
const SET_PROJECTS = 'project/SET_PROJECTS'
const SET_ONE_PROJECT ='project/SET_ONE_PROJECT'
const PROJECT_CREATE_SUCCESS = 'project/PROJECT_CREATE_SUCCESS'
const PROJECT_DELETE_SUCCESS = 'project/PROJECT_DELETE_SUCCESS'
const PROJECT_UPDATE_SUCCESS = 'project/PROJECT_UPDATE_SUCCESS'


let initialState = {
    projects : [],
    project : [],
    project_set_success: false,
    error: null,
    create_project_success: false,
    delete_project_success : false,
    update_project_success: false
};

export const projectReducer = (state=initialState, action) => {

    switch (action.type) {
        case SET_PROJECTS:
           return {
               ...state,  projects: action.payload, project_set_success: true
           }
        case SET_ONE_PROJECT:
           return {
               ...state,  project: action.payload, project_set_success: true
           }
        case ERROR:
           return {
               error: action.payload
           }
        case PROJECT_CREATE_SUCCESS:
           return {
               ...state, create_project_success: action.payload
           }
        case PROJECT_DELETE_SUCCESS:
           return {
               ...state, delete_project_success: action.payload
           }
        case PROJECT_UPDATE_SUCCESS:
           return {
               ...state, update_project_success: action.payload
           }
       default:
            return state;
    }
}

const setProject = (payload ) =>({type: SET_PROJECTS, payload:payload})
const setOneProject = (payload) =>({type: SET_ONE_PROJECT, payload:payload})
const setError = (payload) => ({type: ERROR, payload: payload })
const projectCreateSuccess = (payload) =>({type:PROJECT_CREATE_SUCCESS, payload: payload})
const projectDeleteSuccess = (payload) =>({type:PROJECT_DELETE_SUCCESS, payload: payload})
const projectUpdateSuccess = (payload) =>({type:PROJECT_UPDATE_SUCCESS, payload: payload})

/* -----------       THUNKS     ----------- */

export const GetAllProject =()=> async (dispatch) => {
  const response = await projectsAPI.get_all_projects();
  if (response.status === 200){
       dispatch(setProject(response.data))
  }else if(response.status === 400 || 404 || 401 || 403 || 500 || 501) {
      dispatch(setProject([]))
      dispatch(setError("error"))
  }else {
      dispatch(setError("error"))
      dispatch(setProject([]))
  }
}

export const GetOneProject =(id)=> async (dispatch) => {
  const response = await projectsAPI.get_one_project(id);
  if (response.status=== 200 || 201){
      dispatch(setOneProject(response.data))
  }else if(response.status === 404) {
      dispatch(setOneProject(response.data))
  }
}
/* start,end, developers, supervisor,title,status, description */
export const ProjectCreate= (data)=> async (dispatch)=>{
       let response = await  projectsAPI.createProject(data);
       if(response.status === 200 || 201) {
           dispatch(projectCreateSuccess(true))
           setTimeout(()=>{
               dispatch(projectCreateSuccess(false))
           },6000)

       }else if (response.status === 400 || 401 || 403 || 500 || 501) {
          dispatch(projectCreateSuccess(false))
  } else {
           dispatch(projectUpdateSuccess(false))
  }
}

export const ProjectDelete= (id)=> async (dispatch)=>{
       let response = await  projectsAPI.deleteProject(id);
       if(response.status === 200 || 201) {
           dispatch(projectDeleteSuccess(true))
            setTimeout(()=>{
               dispatch(projectDeleteSuccess(false))
           },2000)
       }else if (response.status === 400 || 401 || 403 || 500 || 501) {
          dispatch(projectDeleteSuccess(false))
  }else {
           dispatch(projectUpdateSuccess(false))
 }
}

export const ProjectUpdate= (id, data)=> async (dispatch)=>{
       let response = await  projectsAPI.updateProject(id, data);
       if(response.status === 200 || 201) {
           dispatch(projectUpdateSuccess(true))
           setTimeout(()=>{
               dispatch(projectUpdateSuccess(false))
           },6000)
       }else if (response.status === 400 || 401 || 403 || 500 || 501) {
          dispatch(projectUpdateSuccess(false))
        }else {
           dispatch(projectUpdateSuccess(false))
       }
}