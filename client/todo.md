# User (Public)

1. Login/Register UI

- Formik

- Chakra UI formErrorMessage

- Click to change between Login and Register Components

2. UserSlice

- Login/Register actioncreators with pending/fulfilled/rejected (loginUser, registerUser)

- Save user info in localStorage

- Dispatch in UI components

3. Store

- Preloadstate is the user from localStorage if no user than empty array

4. Logout

- if logout clear state of userState to init and remove from localStorage

# Toast (Global)

1. Create Slice of toast with success, error and clear State (toastSuccess, toastError, clearToast)

2. Add toast component on the Layout (very top component) and dispatch clearing after calling it

3. export the actions to the user and dispatch in the suited actionscreators after fulfilling

# Profile (Private)

1. Create Profiles and SingleProfile UI

2. If not logged in guest can see all Profiles who are logged in

3. profileSlice

- Fetch data from database and useEffect to display them. Aside like facebook (getProfiles)

- Fetch by ID to display single Profile when clicking (getProfileById)

- create/update profile for CreateProfile UI with formik like login with more fields (createProfile)

~~\* Delete Profile. User can delete own profile, only own user (deleteProfile)~~

- create/update experience Fields. User can update/create own experience field (formik) (createExp)

- create/update education Fields. User can update/create own experience field (formik) (createEdu)

# Post (Private)

1. Post Ui is renderd at the dashboard. If logged in. (getPosts)

2. User can create Post => showing pic beside the post

3. other Users can like or unlike liked posts (likedPost, unlikePost)

4. FInally the can comment a post (createComment) or delete own comment (deleteComment)
