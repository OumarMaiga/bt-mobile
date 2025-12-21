import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  require('@/assets/images/add.png'),
  require('@/assets/images/add-2.jpg'),
];

const AutoSlider = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <View style={{ height: 200 }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={{ width: width, height: 200, resizeMode: 'cover' }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AutoSlider;
