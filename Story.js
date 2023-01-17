export default function Story(storyObject) {
  return `
    <div class="story">
      <div> 
        <span class="gray">${storyObject.index || ""}</span>
        <span class="upvote">▲</span>
        <a href="${storyObject.url}">${storyObject.title}</a>
        <span>(${storyObject.domain})</span>
      </div>
      <div>
        <div class="gray">
          ${storyObject.points} points by ${storyObject.user} ${storyObject.time_ago}
          |
          <a href="#/item?id=${storyObject.id}">
            ${storyObject.comments_count} comments
          </a>
          |
          <span class="favorite" data-story='${JSON.stringify(storyObject)}'>
            <i class="fa-${storyObject.isFavorite ? "solid" : "regular"} fa-heart"></i> ${storyObject.isFavorite ? "Remove From" : "Add To"} Favorites</span>
        </div>
      </div>
    </div>
  `;
}