import { Modal, View, Image, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  images: string[];
  visible: boolean;
  index: number;
  onClose: () => void;
};

export default function ImageViewerModal({ images, visible, index, onClose }: Props) {
  if (!images.length) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black/95">
        <SafeAreaView className="flex-1">
          <View className="flex-row justify-between items-center px-5 pt-2 pb-4">
            <Text className="font-body-medium text-white/70 text-[13px]">
              {index + 1} of {images.length}
            </Text>
            <Pressable
              onPress={onClose}
              className="w-9 h-9 rounded-full bg-white/10 items-center justify-center"
            >
              <Ionicons name="close" size={20} color="white" />
            </Pressable>
          </View>
          <View className="flex-1 items-center justify-center px-4">
            <Image
              source={{ uri: images[index] }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}