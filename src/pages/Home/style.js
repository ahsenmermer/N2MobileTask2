import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20
    },
    text: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.text
    },
    input: {
        backgroundColor: colors.lightGray,
        width:"75%",
    },
    btn:{
        width:60,
        height:48,
        backgroundColor:colors.lightBlue,
        borderWidth:1,
        borderColor:colors.borderColor,
        borderRadius:8
    },
    inputContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        marginTop: 30,
    },
    button: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.lightBlue,
    },
    playText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    title: {
        fontSize: 48,
        fontWeight: "700",
        color: "#1E1B4B",
        width:"75%"
    },
    nounContainer: {
        padding: 15,
    },
    line: {
        borderBottomWidth: 1,
        width: "60%",
        borderColor: colors.borderColor,
        alignSelf: "center",
        left: 24
    },
    noun: {
        fontSize: 20,
        fontWeight: "400",
        fontStyle: "italic",
        color: colors.text
    },
    meaning: {
        fontSize: 16,
        color: colors.text
    },
    titleComplete: {
        fontSize: 16,
        color: colors.iconGray,
    },
    synonyms: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.lightBlue,
        marginBottom: 8
    },
    desc: {
        fontSize: 16,
        color: colors.iconGray,
        marginBottom:24
    },
    inContainer: {
        flexDirection: "row",
        marginBottom: 18
    },
    inContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    profile:{
        fontSize:18,
        color:colors.lightBlue,
        fontWeight:"600",
        right:7
    },
    actionSheet:{
        height:400,
        padding:20,

    },
    lastSearch:{
        fontSize:18,
        borderBottomWidth:1,
        borderBottomColor:colors.borderColor
    },
    favoriteWord:{
        fontSize:18,
        marginTop:12,
        left:8
        
    },
    actionView:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10
    },
    activeTitle:{
        fontSize:20,
        color:colors.lightBlue,
        fontWeight:"600",
        borderBottomColor:colors.lightBlue,
        borderBottomWidth:1.5
    },
    indexTitle:{
        fontSize:18,
        marginTop:12,

    },
    indexContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        
        borderBottomWidth:1,
        borderBottomColor:colors.borderColor,
       
        padding:12,
        alignItems:"center"
    }
});

export default styles;