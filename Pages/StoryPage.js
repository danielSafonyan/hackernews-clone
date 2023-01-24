import view from "../utils/view.js"
import baseUrl from "../utils/baseUrl.js"
import Story from '../components/Story.js'
import Comments from '../components/Comments.js'


export default async function StoryPage(path) {
    let story
    let hasComments
    
    try { 
        // get itemId from the URL hash
        const itemId = window.location.hash.split('?id=').pop()
        story = await fetchStory(itemId) 
        hasComments = story.comments.length > 0;
      } catch(error) {
        view.innerHTML = `<div class="error">Error fetching story</div>`;
        return
      } 
      
    view.innerHTML = `
                    <div>
                      ${Story(story)}
                    </div>
                    <hr/>
                    ${hasComments ? story.comments.map(comment => Comments(comment)).join('') : 'No comments'}
                `  
}

async function fetchStory(itemId) {
    const resp = await fetch(`${baseUrl}/item/${itemId}`)
    const data = await resp.json()
    return data
}