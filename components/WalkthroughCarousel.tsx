import ThemedText from '@/components/ThemedText'
import EStyleSheet from '@/constants/Theme'
import React, { ReactElement, useEffect, useRef } from 'react'
import { Dimensions, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import type { ICarouselInstance } from 'react-native-reanimated-carousel/lib/typescript/types'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export interface CarouselItem {
  title: string
  description: string
  image: ReactElement
}

interface OnboardingCarouselProps {
  carouselData: CarouselItem[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

function WalkthroughCarousel ({ carouselData, currentIndex, setCurrentIndex }: OnboardingCarouselProps) {
  const carouselRef = useRef<ICarouselInstance>(null)
  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={styles.carouselItem}>
      {item.image}
      <ThemedText style={styles.carouselItemTitle} variant="bigTitleTextStyle">{item.title}</ThemedText>
      <ThemedText style={{ lineHeight: 26 }} variant="carouselItemDescription">{item.description}</ThemedText>
    </View>
  )

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ index: currentIndex, animated: true })
    }
  }, [currentIndex])
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ display: 'flex', height: '70%' }}>
          <Carousel
            ref={carouselRef}
            width={screenWidth}
            height={screenHeight * 0.6}
            data={carouselData}
            renderItem={renderItem}
            loop={false}
            onSnapToItem={(index) => {setCurrentIndex(index)}}
          />
        </View>
      </View>
    </>
  )
}

const styles = EStyleSheet.create({
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselItem: {
    alignItems: 'center',
    paddingHorizontal: 24
  },
  carouselItemTitle: {
    marginTop: 40,
    marginBottom: 8
  }
})

export default WalkthroughCarousel