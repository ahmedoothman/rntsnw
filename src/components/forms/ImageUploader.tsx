import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image as ImageCompressor} from 'react-native-compressor';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch} from '@redux/hooks';
import {addNotification} from '@redux/slices/notificationSlice';
import {useTranslation} from 'react-i18next';
import {Text} from '@components/Text';

interface ImageAsset {
  uri: string;
  type?: string;
  fileName?: string;
  fileSize?: number;
  id?: string;
}

interface ImageUploaderProps {
  images: ImageAsset[];
  setImages: (_images: ImageAsset[]) => void;
  maxImages?: number | null;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  setImages,
  maxImages = null,
  className,
}) => {
  const isProfileImage = maxImages === 1;
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImageIndex, setLoadingImageIndex] = useState<number | null>(
    null,
  );

  const handleImagePick = async () => {
    // Check if we've reached the maximum number of images
    if (maxImages !== null && images.length >= maxImages) {
      if (isProfileImage) {
        // For profile image, replace existing image
        setIsLoading(true);
        launchImageLibrary(
          {
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1,
          },
          async (response: any) => {
            handleImageResponse(response, true);
          },
        );
      } else {
        dispatch(
          addNotification({
            message: t('imageUploader.maxImagesReached'),
            type: 'error',
          }),
        );
      }
      return;
    }

    setIsLoading(true);
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: maxImages ? maxImages - images.length : 10,
      },
      (response: any) => {
        handleImageResponse(response);
      },
    );
  };

  const handleImageResponse = async (
    response: any,
    replaceExisting = false,
  ) => {
    try {
      if (response.assets && response.assets.length > 0) {
        const processedImages: ImageAsset[] = [];

        for (let i = 0; i < response.assets.length; i++) {
          const originalAsset = response.assets[i];

          // Convert content URI to file URI if necessary
          const convertedAsset =
            Platform.OS === 'android' &&
            originalAsset.uri?.startsWith('content://')
              ? await convertContentUri(originalAsset)
              : originalAsset;

          const originalUri = convertedAsset.uri!;

          setLoadingImageIndex(i);

          // Compress the image
          const compressedUri = await ImageCompressor.compress(originalUri, {
            compressionMethod: 'auto',
            quality: 0.8,
            maxWidth: 1200,
            maxHeight: 1200,
            output: 'jpg',
          });

          // Get file stats for compressed image
          const fileStats = await RNFS.stat(compressedUri);

          const imageObject: ImageAsset = {
            uri: compressedUri,
            type: 'image/jpeg',
            fileName: `compressed_${Date.now()}_${i}.jpg`,
            fileSize: fileStats.size,
            id: `${Date.now()}_${i}`,
          };

          processedImages.push(imageObject);
        }

        if (replaceExisting) {
          setImages(processedImages);
        } else {
          setImages([...images, ...processedImages]);
        }

        dispatch(
          addNotification({
            message: t('imageUploader.imagesAdded'),
            type: 'success',
          }),
        );
      }
    } catch (error) {
      console.error('Error processing images:', error);
      dispatch(
        addNotification({
          message: t('imageUploader.errorProcessing'),
          type: 'error',
        }),
      );
    } finally {
      setIsLoading(false);
      setLoadingImageIndex(null);
    }
  };

  const convertContentUri = async (file: any) => {
    try {
      const destPath = `${RNFS.CachesDirectoryPath}/${Date.now()}-${
        file.fileName || 'image.jpg'
      }`;
      await RNFS.copyFile(file.uri, destPath);
      return {
        ...file,
        uri: `file://${destPath}`,
      };
    } catch (error) {
      console.error('Error converting content URI:', error);
      return file;
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const getRemainingCount = (): number => {
    if (maxImages === null) {
      return Infinity;
    }
    return maxImages - images.length;
  };

  return (
    <View className={`p-4 ${className || ''}`}>
      <Text weight="medium" className="text-lg text-primary-600 mb-3">
        {isProfileImage
          ? t('imageUploader.profileImage')
          : t('imageUploader.uploadImages')}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-3">
          {/* Upload Button */}
          {(maxImages === null || images.length < maxImages) && (
            <TouchableOpacity
              className="w-25 h-25 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg items-center justify-center"
              onPress={handleImagePick}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#E5843B" />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={30}
                    color="#9CA3AF"
                  />
                  <Text className="text-xs text-gray-500 mt-1 text-center">
                    {t('imageUploader.addPhoto')}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {/* Image Previews */}
          {images.map((image, index) => (
            <View key={image.id || index} className="relative mr-3">
              <Image
                source={{uri: image.uri}}
                className="w-25 h-25 rounded-lg"
                resizeMode="cover"
              />
              {loadingImageIndex === index && (
                <View className="absolute inset-0 bg-black/50 rounded-lg items-center justify-center">
                  <ActivityIndicator size="small" color="white" />
                </View>
              )}
              <TouchableOpacity
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full items-center justify-center"
                onPress={() => removeImage(index)}>
                <MaterialCommunityIcons name="close" size={14} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Image Count Info */}
      {maxImages && maxImages > 1 && (
        <View className="flex-row items-center mt-2">
          <Text className="text-sm text-gray-500">
            {images.length} / {maxImages} {t('imageUploader.imagesSelected')}
          </Text>
          {getRemainingCount() > 0 && (
            <Text className="text-sm text-primary-600 ml-1">
              ({getRemainingCount()} {t('imageUploader.remaining')})
            </Text>
          )}
        </View>
      )}

      {/* File Size Info for Profile Image */}
      {isProfileImage && images.length > 0 && (
        <View className="mt-2">
          <Text className="text-xs text-gray-500">
            {t('imageUploader.fileSize')}:{' '}
            {((images[0].fileSize || 0) / 1024 / 1024).toFixed(2)} MB
          </Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(ImageUploader);
