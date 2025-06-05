import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="bg-gray-100 flex-1">
      {/* Barra de navegación */}
      <View className="bg-black p-4">
        <Text className="text-white text-2xl font-bold">Urban Shop</Text>
      </View>

      {/* Imagen de fondo con texto */}
      <View className="relative w-full h-[500px] mt-4">
        <Image
          source={require('../../assets/images/logo-urban-shop.png')}
          className="w-full h-full absolute"
          style={{ resizeMode: 'cover', opacity: 0.5 }}
        />
        <View className="absolute inset-0 items-center justify-center flex">
          <Text className="text-white text-3xl font-bold uppercase">Bienvenido a Urban Shop</Text>
        </View>
      </View>

      {/* Sección de categorías */}
      <View className="px-4 py-8">
        <View className="flex-row justify-between flex-wrap">
          {/* Hombres */}
          <TouchableOpacity
            className="w-full md:w-[30%] mb-4 rounded-xl overflow-hidden"
            onPress={() => router.push('/hombres')}>
            <Image
              source={require('../../assets/images/Rey.png')}
              style={{ width: 200, height: 200 }}
            />

            <View className="absolute inset-0 bg-black bg-opacity-30 items-center justify-center flex">
              <Text className="text-white text-2xl font-bold">Hombres</Text>
            </View>
          </TouchableOpacity>

          {/* Accesorios */}
          <TouchableOpacity
            className="w-full md:w-[30%] mb-4 rounded-xl overflow-hidden"
            onPress={() => router.push('/accesorios')}>
            <Image
              source={require('../../assets/images/accesorios.png')}
              className="w-full h-[200px]"
              style={{ resizeMode: 'cover' }}
            />
            <View className="absolute inset-0 bg-black bg-opacity-30 items-center justify-center flex">
              <Text className="text-white text-2xl font-bold">Accesorios</Text>
            </View>
          </TouchableOpacity>

          {/* Mujeres */}
          <TouchableOpacity
            className="w-full md:w-[30%] mb-4 rounded-xl overflow-hidden"
            onPress={() => router.push('/mujeres')}>
            <Image
              source={require('../../assets/images/reyna.png')}
              className="w-full h-[200px]"
              style={{ resizeMode: 'cover' }}
            />
            <View className="absolute inset-0 bg-black bg-opacity-30 items-center justify-center flex">
              <Text className="text-white text-2xl font-bold">Mujeres</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
