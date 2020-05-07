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
};
 





