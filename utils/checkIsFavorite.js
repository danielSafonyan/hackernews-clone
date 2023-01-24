export default function checkFavorite(favorites, story) {
  return !!favorites.find(favorite => favorite.id === story.id); 
}