import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className='flex-1 flex justify-around bg-white'>
      <View className="space-y-2">
        <Text style={{fontSize: wp('15%')}} className="text-center font-bold text-gray-700">Jarvis</Text>
        <Text style={{fontSize: wp('4%')}} className="text-center tracking-wider font-semibold text-gray-600">
          The future is here, powered by AI
        </Text>
      </View>
      <View className="flex flex-row justify-center">
        <Image source={require('../../assets/images/welcome.png')} style={{width: wp('70%'), height: wp('70%')}}/>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} className="bg-sky-500 p-4 rounded-2xl mx-5">
        <Text style={{fontSize: wp('5%')}} className="text-center text-white font-semibold">Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
export default WelcomeScreen