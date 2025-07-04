import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { useRouter } from "expo-router";
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const Search = () => {

  const [searchQuery, setSearchQuery] = React.useState('');

  const router = useRouter();

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError, 
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false);

  useEffect(()=> {
    const timeoutId = setTimeout(async () => {
    if (searchQuery.trim()) {
      await loadMovies()
    } else {
    reset()
  }
}, 500);
return () => clearTimeout(timeoutId);
  }, [searchQuery])

  useEffect(()=> {
    if ((movies ?? []).length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'></Image>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingBottom: 100}}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10'/>
            </View>
            <View className='my-5'>
              <SearchBar 
              placeholder='Search for content...'
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator size='large' color='#0000ff' className='my-3'/>
        )}
        {moviesError && (
          <Text className='text-red-500 px-5 my-3'>Error: {moviesError.message}</Text>
        )}
        {!moviesLoading && !moviesError && searchQuery.trim() && movies && movies?.length > 0 && (
          <Text className='text-xl text-white font-bold'>
            Search results for {searchQuery}
            <Text className='text-accent'>
              {searchQuery}
            </Text>
          </Text>
        )}
          </>
        }
        ListEmptyComponent={
          !loadMovies && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text
              style={{
                textAlign: 'center',
                color: '#6B7280', // This is Tailwind's gray-500 hex
              }}
              >
  {searchQuery.trim() ? 'No content found' : 'Search for content'}
</Text>
              </View>
          ) : null
        }
        />
    </View>
  )
}

export default Search