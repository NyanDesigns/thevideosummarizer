export function YouTubeThumbnailComponent({ thumbnailUrl }) {
  if (!thumbnailUrl) return null;

  //RenderFrontEnd
  return (
    <img
      alt="YouTube Thumbnail"
      className="block w-full rounded-md"
      src={thumbnailUrl}
    />
  );
}