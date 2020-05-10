import { useState, useEffect } from "react";

const baseUrl = "http://media.mw.metropolia.fi/wbma/";

const useAllMedia = (tag) => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'tags/'+tag);
    const json = await response.json();

    const items = await Promise.all(
      json.map(async (item) => {
        const response = await fetch(baseUrl + "media/" + item.file_id);
        return await response.json();
      })
    );
    console.log(items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

const useSingleMedia = (id) => {
  const [data, setData] = useState(null);
        const fetchUrl = async (fileid) => {
          const response = await fetch(baseUrl + "media/" + fileid);
          const item = await response.json();
          if(localStorage.getItem('token') !== null) {
            const userResponse = await getUser(item.user_id, localStorage.getItem('token'));
            item.user = userResponse;
          }
          setData(item);
        };
        
        useEffect(() => {
          fetchUrl(id);
        }, [id]);

        return data;
};

const getAvatarImage = async (id) => {
  const response = await fetch(baseUrl + 'tags/liquidavatar_' + id);
  return await response.json();
  };


const register = async (inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + "users", fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ": " + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (inputs) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + "login", fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ": " + json.error);
    {
      return json;
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkUserAvailable = async (name) => {
  try {
    const response = await fetch(baseUrl + "users/username/" + name);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ": " + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkToken = async (token) => {
  const fetchOptions = {
    headers: {
      "x-access-token": token,
    },
  };
  try {
    const response = await fetch(baseUrl + "users/user", fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ": " + json.error);
    {
      return json;
    }
  } catch (e) {
    throw new Error(e.message);
  }
};


const updateProfile = async (inputs, token) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const uploadPicture = async (inputs, token, tag) => {
  const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);
        formData.append('file', inputs.file);

  const fetchOptions = {
    method: 'POST',
    body: formData,
    headers: {
        'x-access-token': token,
    },
};
try {
  const response = await fetch(baseUrl + 'media', fetchOptions);
  const json = await response.json();
  if (!response.ok) throw new Error(json.message + ': ' + json.error);

  const tagOptions = {
    method: 'POST',
    body: JSON.stringify({
      'file_id': json.file_id,
      'tag': 'liquidapp',
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  const tagResponse = await fetch(baseUrl + 'tags', tagOptions);
  const tagJson = await tagResponse.json();
  const tagi = addTag(json.file_id, tag, token);
  return {json, tagJson, tagi};
} catch (e) {
  throw new Error(e.message);
}

};

const uploadFavorite = async (inputs, token, tag) => {
  const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);
        formData.append('file', inputs.file);

  const fetchOptions = {
    method: 'POST',
    body: formData,
    headers: {
        'x-access-token': token,
    },
};
try {
  const response = await fetch(baseUrl + 'media', fetchOptions);
  const json = await response.json();
  if (!response.ok) throw new Error(json.message + ': ' + json.error);

  const tagOptions = {
    method: 'POST',
    body: JSON.stringify({
      'file_id': json.file_id,
      'tag': 'liquidappfavorites',
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  const tagResponse = await fetch(baseUrl + 'tags', tagOptions);
  const tagJson = await tagResponse.json();
  const tagi = addTag(json.file_id, tag, token);
  return {json, tagJson, tagi};
} catch (e) {
  throw new Error(e.message);
}

};

const addTag = async (file_id, tag, token) => {
  const tagOptions = {
    method: 'POST',
  body: JSON.stringify({
    file_id,
    tag,
  }),
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': token,
  },
};

try {
const tagResponse = await fetch(baseUrl + 'tags', tagOptions);
const tagJson = await tagResponse.json();
return tagJson;
} catch (e) {
  throw new Error(e.message);
}
};

const uploadProfilePicture = async (inputs, token, tag) => {
  const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);
        formData.append('file', inputs.file);

  const fetchOptions = {
    method: 'POST',
    body: formData,
    headers: {
        'x-access-token': token,
    },
};
try {
  const response = await fetch(baseUrl + 'media', fetchOptions);
  const json = await response.json();
  if (!response.ok) throw new Error(json.message + ': ' + json.error);

  const tagOptions = {
    method: 'POST',
    body: JSON.stringify({
      'file_id': json.file_id,
      'tag': 'liquidProfiles',
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  const tagResponse = await fetch(baseUrl + 'tags', tagOptions);
  const tagJson = await tagResponse.json();
  const tagi = addTag(json.file_id, tag, token);
  return {json, tagJson, tagi};
} catch (e) {
  throw new Error(e.message);
}

};

const uploadWish = async (inputs, token, tag) => {
  const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);
        formData.append('file', inputs.file);

  const fetchOptions = {
    method: 'POST',
    body: formData,
    headers: {
        'x-access-token': token,
    },
};
try {
  const response = await fetch(baseUrl + 'media', fetchOptions);
  const json = await response.json();
  if (!response.ok) throw new Error(json.message + ': ' + json.error);

  const tagOptions = {
    method: 'POST',
    body: JSON.stringify({
      'file_id': json.file_id,
      'tag': 'liquidappwishlist',
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  const tagResponse = await fetch(baseUrl + 'tags', tagOptions);
  const tagJson = await tagResponse.json();
  const tagi = addTag(json.file_id, tag, token);
  return {json, tagJson, tagi};
} catch (e) {
  throw new Error(e.message);
}

};

const getUser = async (id, token) => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'users/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json; 
  } catch (e) {
    throw new Error(e.message);
  }
};

const useMyMedia = (id) => {
  const [data, setData] = useState(null);
        const fetchUrl = async (fileid) => {
          const response = await fetch(baseUrl + "media/" + fileid);
          const item = await response.json();
          if(localStorage.getItem('token') !== null) {
            const userResponse = await getUser(item.user_id, localStorage.getItem('token'));
            item.user = userResponse;
          }
          setData(item);
        };
        
        useEffect(() => {
          fetchUrl(id);
        }, [id]);

        return data;
};

const postComment = async (token, id, inputs) => {
  console.log('kommentti: ', inputs, 'file_id: ', id);
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({
      'file_id': parseInt(id),
      'comment': inputs.comment
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  console.log('fetchOptions', fetchOptions);
  try {
    const commentResponse = await fetch(baseUrl + 'comments', fetchOptions);
    const commentJson = await commentResponse.json();
    return commentJson;
    
    } catch (e) {
      throw new Error(e.message);
    }
};

const useComments = (id, token) => {
  const [item, setItem] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'comments/file/' + id);
    const json = await response.json();
    const items = await Promise.all(
      json.map(async (item) => {
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
      };
        const responseUser = await fetch(baseUrl + 'users/' + parseInt(item.user_id), fetchOptions);
        const responseJSON = await responseUser.json();
        return {
          ...item,
          user: responseJSON.username,
        };
      })
    );
  
    setItem(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return item;
};

const deleteFile = async (id) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(baseUrl + 'media/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const modifyFile = async (inputs, id) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'media/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};


export {
  useAllMedia,
  useSingleMedia,
  login,
  register,
  checkUserAvailable,
  checkToken,
  getAvatarImage,
  updateProfile, 
  uploadPicture,
  addTag,
  uploadProfilePicture,
  uploadFavorite,
  uploadWish,
  getUser,
  useMyMedia,
  postComment,
  modifyFile,
  deleteFile,
  useComments,
};
 





