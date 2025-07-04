import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { Link } from 'expo-router';
import { images } from "../../constants/images";
import { icons } from "../../constants/icons";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import { useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError 
  } = useFetch(() => fetchMovies({
    query: ''
  }));

  // Add more detailed logging
  console.log('Full Component State:', {
    isLoading: moviesLoading,
    hasError: !!moviesError,
    errorMessage: moviesError?.message,
    hasData: !!movies,
    movieCount: movies?.length,
    firstMovie: movies?.[0]
  });

  // Add useEffect to track state changes
  useEffect(() => {
    if (moviesLoading) {
      console.log('Loading started');
    } else {
      console.log('Loading finished');
    }
  }, [moviesLoading]);

  return (
    <View className="flex-1
    bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"></Image>
      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
        
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
          <SearchBar 
          onPress={() => router.push("/search")}
          onChangeText={()=> {}}
          value={''}
          placeholder="Search for a movie"
          />

          {trendingMovies && (
            <View className="mt-10">
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>
          Trending Movies
        </Text>
            </View>
          )}
          <>
        
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4"/>}
          className="mb-4 mb-3" 
          data={trendingMovies}
          renderItem={({ item, index })=>(
          <Text className="text-white text-sm">{item.title}</Text>
        )}
          keyExtractor={(item) => item.movie_id.toString()}
          />
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>
          Latest Movies
        </Text>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <MovieCard {...item} />
          )}
          keyExtractor={(item) => item.id.toString()} 
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            gap: 8,
          }} 
          style={{ 
            marginTop: 8,
            paddingBottom: 128,
          }}
          contentContainerStyle={{
            paddingHorizontal: 4,
          }}
          scrollEnabled={false}
        />
        </>
        </View>
        )}
      </ScrollView>
    </View>
  );
}
