import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { Link } from 'expo-router';
import { images } from "../../constants/images";
import { icons } from "../../constants/icons";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

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
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
        
        {moviesLoading ? (
          <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
          <SearchBar 
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
          />
          <>
        <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
        <Text style={{ color: '#FFFFFF' }}>Test White Text</Text>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <View className="flex-1 p-2">
              <Text className="text-white text-lg font-bold">
                {item.title}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()} 
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            gap: 20,
            paddingRight: 5,
            marginBottom: 10
          }} 
          className="mt-2 pb-32"
          scrollEnabled={false}
        />
        </>
        </View>
        )}
      </ScrollView>
    </View>
  );
}
