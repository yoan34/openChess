declare module '*.png' {
  import type { ImageSourcePropType } from 'react-native'
  const src: ImageSourcePropType
  export default src
}

declare module '*.jpg' {
  import type { ImageSourcePropType } from 'react-native'
  const src: ImageSourcePropType
  export default src
}

declare module '*.jpeg' {
  import type { ImageSourcePropType } from 'react-native'
  const src: ImageSourcePropType
  export default src
}

declare module '*.gif' {
  import type { ImageSourcePropType } from 'react-native'
  const src: ImageSourcePropType
  export default src
}

declare module '*.svg' {
  import type React from 'react'
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module '*.ttf' {}
