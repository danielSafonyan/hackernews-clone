import view from "./view.js"
import baseUrl from "./baseUrl.js"
import Story from './Story.js'
import Comments from './Comments.js'


export default async function Item(path) {
    let story = null;
    let hasComments = false;  
    let hasError = false;
    
    try { 
     story = await fetchStory() 
     hasComments = story.comments.length > 0;
  } catch(error) {
     hasError = true; 
     console.error(error);
  } 
  
  if (hasError) {
     view.innerHTML = `<div class="error">Error fetching story</div>`;
  }
    
    view.innerHTML = `
  <div>
    ${Story(story)}
  </div>
  <hr/>
  ${hasComments ? story.comments.map(comment => Comments(comment)).join('') : 'No comments'}
  `  
}

async function fetchStory() {
    const itemId = window.location.hash.split('?id=').pop()
    const resp = await fetch(`${baseUrl}/item/${itemId}`)
    const data = await resp.json()
    return data
}