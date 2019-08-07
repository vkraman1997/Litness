import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  addHubButton: {
    backgroundColor:"white",
    borderColor:'black',
    borderWidth: 2,
    position: 'absolute',
    right: 0,
    top: '16%',
  }, 
  bigContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent:'flex-start',
  },
  closeBar: {
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    position: 'absolute',
    left: 4,
    top: 4
  }, 
  container: {
    justifyContent: 'center',
    flex:1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  emojiIcon: {
    height: 40,
    resizeMode: 'contain',
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor:'black'
  },
  flatListContainer: {
    flex: 1,
    width: '95%',
  },
  ghostMarker: {
    borderWidth: 2,
    borderColor: "transparent",
    position: 'absolute',
    alignItems:'center',
    justifyContent:'center',
  },        
  infoPage: {
    height: '90%',
    width: '90%',
    position: 'absolute',
    top:50,
    alignSelf:'center',
    borderColor:'black',
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    zIndex:4,
  },
  infoPageIcons: {
    height: 20,
    resizeMode: 'contain',
    width: 20,
    backgroundColor:'white'
  },
  LBinnerBox: {
    height:30,
    width: 30,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right:4,
    backgroundColor:"white",
  },
  leaderboard: {
    height: '90%',
    width: '90%',
    position: 'absolute',
    top:50,
    alignSelf:'center',
    borderColor:'black',
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    zIndex:1,
  },
  leaderBoardButton: {
    backgroundColor:"white",
    borderColor:'black',
    borderWidth: 2,
    position: 'absolute',
    flex:1,
    right: 0,
    top: '12%',
  },
  leaderBoardCell: {
    marginTop: 10,
    display:"flex",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0,
    backgroundColor:'white'
  },
  leaderboardText: {
    fontSize: 20,
  },
  loading: {
    position: 'absolute',
    right: 2,
    top:2,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent:'center'
  },
  locationText: {
    marginTop:10,
    alignSelf: 'center',
  },
  marker: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "transparent",
    position: 'absolute',
    alignItems:'center',
    justifyContent:'center',
  },
  markerCost: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      position: 'absolute',
  },
  refresh: {
    position: 'absolute',
    right: 2,
    top:2,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent:'center'
  }, 
  refreshPositionButton: {
    backgroundColor:"white",
    borderColor:'black',
    borderWidth: 2,
    position: 'absolute',
    flex:1,
    right: 0,
    top: '20%',
  },
  tab: {
    backgroundColor:"white",
    borderColor:'black',
    borderWidth: 2,
    borderRadius: 10,
    position: 'absolute',
    flex:1,
    top: '40%',
    flexDirection:'column',
    justifyContent: 'space-evenly',
    alignItems:"center",
  },
  tabStyle: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "transparent",
    position: 'absolute',
    alignItems:'center',
    justifyContent:'center',
    fontSize: 50,
  }
});