import { View, Text, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Features = () => {
  return (
    <View style={{height: hp('60%')}} className="space-y-4 z-50">
      <Text style={{fontSize: wp('5%')}} className="font-semibold text-gray-200">Features</Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-4">
            <Image source={require('../../assets/images/chatgptIcon.png')} style={{width: hp('10%'), height:hp('10%')}}/>
            <Text style={{fontSize: wp('4.8%')}} className="font-semibold text-black">ChatGPT</Text>
        </View>
        <Text className="text-gray-700 font-medium" style={{fontSize: wp('3.8%')}}>
            ChatGPT can provide you with instant and knowladgeble responses, assist you with creative ideas on a wide range topics.
        </Text>
      </View>
      <View className="bg-purple-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-4">
            <Image source={require('../../assets/images/dalleIcon.png')} style={{width: hp('10%'), height:hp('10%')}}/>
            <Text style={{fontSize: wp('4.8%')}} className="font-semibold text-black">DALL-E</Text>
        </View>
        <Text className="text-gray-700 font-medium" style={{fontSize: wp('3.8%')}}>
            DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.
        </Text>
      </View>
      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-4">
            <Image source={require('../../assets/images/smartaiIcon.png')} style={{width: hp('10%'), height:hp('10%')}}/>
            <Text style={{fontSize: wp('4.8%')}} className="font-semibold text-black">Smart AI</Text>
        </View>
        <Text className="text-gray-700 font-medium" style={{fontSize: wp('3.8%')}}>
            A powerful voice assistant with the abilities of ChatGPT and DALL-E, providing you the best of both worlds.
        </Text>
      </View>
    </View>
  )
}

export default Features;