import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons';

const MovieCard = ({ id, poster_path, title, vote_average, release_date}: Movie) => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 3; // Account for padding and gaps

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={{ 
        width: cardWidth,
        marginBottom: 16
      }}>
        <Image 
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }}
          style={{
            width: '100%',
            height: cardWidth * 1.5, // Maintain aspect ratio
            borderRadius: 8
          }}
          resizeMode="cover"
        />
        <Text style={{ 
          color: '#FFFFFF',
          fontSize: 14,
          marginTop: 4,
          fontWeight: '500'
        }}numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4"
            />
            <Text style={{ 
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: 'bold',
                textTransform: 'uppercase'
            }}>
                {Math.round(vote_average / 2)}
            </Text>
        </View>
        <View className="flex-row items-center justify-between">
            <Text className="text-xs text-light-300 font-medium mt-1">
                {release_date.split('-')[0]}
            </Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard