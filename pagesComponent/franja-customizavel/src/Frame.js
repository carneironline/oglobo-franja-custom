import "./Frame.scss"

import ColorsList from "./components/ColorsList"
import ImageTop from "./components/ImageTop"
import Articles from "./components/Articles"

export default function CarouselNewsletter(props) {

  return (
    <div className="franja-customizavel">
      <ColorsList props={props} />

      <ImageTop props={props} />

      <Articles props={props} />

    </div>
  )
}

