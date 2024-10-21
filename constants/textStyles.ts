import EStyleSheet from '@/constants/Theme'

const normalTextStyle = {
  fontSize: 14,
  color: '$textColorNormal',
  fontFamily: 'Urbanist'
}
const boldTextStyle = {
  fontSize: 14,
  color: '$textColorNormal',
  fontFamily: 'UrbanistBold'
}
const bigTitleTextStyle = {
  fontSize: 22,
  fontFamily: 'UrbanistExtraBold'
}

export const textStyles = EStyleSheet.create({
  button: EStyleSheet.flatten([boldTextStyle, {
    color: 'white'
  }]),
  normalTextStyle,
  boldTextStyle,
  bigTitleTextStyle,
  carouselItemDescription: EStyleSheet.flatten([normalTextStyle, {
    textAlign: 'center',
    fontSize: 16
  }]),
  skip: {
    fontSize: 14,
    fontFamily: 'gilroyMedium'
  },
  inputLabel: EStyleSheet.flatten([boldTextStyle, {
    color: '$textColorDarkGrey'
  }]),
  loginTitle: EStyleSheet.flatten([bigTitleTextStyle, {
    fontSize: 28
  }]),
  loginSubtitle: EStyleSheet.flatten([normalTextStyle, {
    fontSize: 16,
    color: '$textColorGrey'
  }]),
  formError: {
    color: 'red',
    fontSize: 12,
    position: 'absolute',
    top: 18,
    left: 30,
    backgroundColor: 'white',
    zIndex: 10,
    paddingHorizontal: 4,
    fontFamily: 'UrbanistSemiBold'
  },
  signLink: EStyleSheet.flatten([boldTextStyle, {
    textDecorationLine: 'underline',
    color: '$primaryColor'
  }]),
  forgotPassword: EStyleSheet.flatten([boldTextStyle, {
    color: '$textColorDarkGrey'
  }]),
  skipForLater: EStyleSheet.flatten([boldTextStyle, {
    textAlign: 'center'
  }]),
  googleButton: EStyleSheet.flatten([boldTextStyle, {
    color: '$textColorDarkGrey'
  }])
})
