import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useEffect, useState } from 'react';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import Voice from '@react-native-community/voice';

export default function HomeScreen() {
  const [messages,setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const [result, setResult] = useState('');

  const speechStartHandler = () => {
    console.log('voice started');
  }
  const speechEndHandler = () => {
    setRecording(false);
    console.log('voice ended');
  }
  const speechResultsHandler = (e) => {
    console.log('voice event : ', e);
    const text = e.value[0];
    setResult(text);
  }

  const speechErrorHandler = (e) => {
    console.log('voice error', e);
  }

  const startRecording = async() => {
    setRecording(true);
    try {
      await Voice.start('en-GB');
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const stopRecording = async() => {
    try {
      await Voice.stop();
      setRecording(false);
    } catch (e) {
      console.log(e);
    }
  }

  const clear = () => {
    setMessages([]);
  }
  const stopSpeaking = () => {
    setSpeaking(false);
  }

  useEffect(() => {
    // voice handler
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  },[])

  // console.log("Results : ", result);

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex flex-row justify-start">
          <Image source={require('../../assets/images/bot-ai-dark.png')} style={{width: hp('20%'), height: hp('11%')}}/>
        </View>

        {/* features here */}
        {
          messages.length > 0 ? (
            <View className="space-y-2 flex-1">
              <Text style={{fontSize: wp('5%')}} className="font-semibold text-gray-400 ml-1">Assistant</Text>
              <View style={{height: hp('70%')}} className="bg-black p-4 rounded-3xl border-gray-700 border-2">
                <ScrollView 
                showsVerticalScrollIndicator={false} 
                bounces={false} 
                className="space-y-4">
                  {
                    messages.map((message, index) => {
                      if(message.role === 'assistant'){
                        if(message.content.includes('https')){
                          // its an AI image
                          return (
                            <View key={index} className="flex-row justify-start">
                              <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                <Image 
                                className="rounded-2xl"
                                resizeMode='stretch'
                                source={{uri: message.content}} 
                                style={{width: wp('60%'), height: wp('60%')}}/>
                              </View>

                            </View>
                          )
                        }else{
                          // Text Response
                          return(
                            <View key={index} className="bg-emerald-100 rounded-xl p-2 rounded-tl-none" style={{width: wp('60%')}}>
                              <Text className="text-black">
                                {message.content}
                              </Text>
                            </View>
                          )
                        }
                      }else{
                        return(
                          <View key={index} className="flex-row justify-end">
                            <View className="bg-white rounded-xl p-2 rounded-tr-none" style={{width: wp('60%')}}>
                              <Text className="text-black">
                                {message.content}
                              </Text>
                            </View>
                          </View>
                        )
                      }
                    })
                  }
                </ScrollView>
              </View>
            </View>
          ) : (
            <Features/>
          )
        }
        {/* recording, clear and stop buttons */}
        <View className="flex justify-center items-center mb-5">
          {
            recording ? (
              <TouchableOpacity
              onPress={stopRecording}>
                <Image source={require('../../assets/images/dark-voice.gif')} 
                style={{width: wp('15%'), height: wp('15%')}}/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              onPress={startRecording}>
                <Image source={require('../../assets/images/dark-record.png')} 
                style={{width: wp('15%'), height: wp('15%')}}/>
              </TouchableOpacity>
            )
          }

          {
            messages.length > 0 && 
            (
              <TouchableOpacity className="bg-black rounded-full p-2 absolute right-1"
              onPress={clear}>
                <Text className="text-white font-semibold border-2 border-white rounded-2xl p-2 px-4 text-center">Clear</Text>
              </TouchableOpacity>
            ) 
          }
          {
            speaking && 
            (
              <TouchableOpacity className="bg-black rounded-full p-2 absolute left-1"
              onPress={stopSpeaking}>
                <Text className="text-red-500 font-semibold border-2 border-red-500 rounded-2xl p-2 px-4 text-center">Stop</Text>
              </TouchableOpacity>
            ) 
          }
        </View>
      </SafeAreaView>
    </View>
  )
}