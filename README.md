Pseudo-Code

1 Create a form with an input where the user can type to search their desired movie.

2 On form submit, make an API call with the user input. If no results are found, return an error message.
3 Print all matching movies to the screen.

4 When user selects a movie, save the metadata of that movie to the state object and make a modal pop up with the information/description of the movie.

5 If user clicks on button inside modal, take them to the foreign movies page where we use the genre IDs from the English movie to make a 2nd API call. With the data returned from the 2nd API call, filter out English movies & render remaining foreign results. Print all the related foreign movies to the page.

6 When user selects a movie, save the metadata of that movie to the state object and make a modal pop up with the information/description of the movie.

7 Allow the user to select one or more foreign movies to save with their English movie.
8 When user presses save button, save the list to Firebase
9 Append and render the saved list to the public list 


MVP

1 Using the movie DB API make a first api call for only English-language movie.
2 Display Results from 1st API call.
3 Select a movie and Make a 2nd API Call with the metadata from the movie select.
4 2nd API call will provide results of similar movies in other languages.


Stretch Goals
1 Firebase user authentication to enable multiple users. Each user can see their own database of lists and Dashboard.
2 User can filter results of the 2nd API calls based on language.