import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { theme } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Feather";
const Journal = () => {
    const { id } = useLocalSearchParams();
    return (
        <View style={styles.body}>
            <View style={styles.heading}>
                <Text style={styles.title}>
                    Feeling Good on a Sunday Afternoon
                </Text>
                <View style={styles.options}>
                    <TouchableOpacity>
                        <Icon name="edit-3" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon
                            name="trash"
                            size={25}
                            style={{ color: theme.colors.error }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
            <ScrollView>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur aliquid tempore tempora neque repudiandae a
                        quasi rerum obcaecati nobis illo, magnam, placeat
                        dolores accusamus quod ullam temporibus. Quo, excepturi
                        magni asperiores, praesentium accusantium adipisci
                        exercitationem minus accusamus non blanditiis impedit
                        velit nemo molestias fugiat rerum vitae ea quae
                        aspernatur itaque dicta corrupti voluptates! Aut
                        laboriosam repellat voluptates repudiandae inventore ut,
                        rem sunt enim quisquam iure nobis. Natus itaque incidunt
                        inventore amet eaque recusandae veniam cupiditate
                        distinctio nostrum, ipsam consectetur esse ad voluptas
                        eos exercitationem molestiae excepturi repudiandae
                        aliquam non beatae! Atque ad vitae ipsa soluta expedita
                        fuga impedit mollitia dolore corporis! Voluptate
                        dignissimos tempore suscipit hic ducimus commodi labore.
                        Aut laboriosam earum similique fugiat eligendi vero ab
                        porro, unde nemo mollitia officia commodi atque,
                        officiis saepe optio in qui quae quisquam voluptate
                        nobis vitae rem quibusdam reiciendis. Quis, perspiciatis
                        laboriosam! Voluptate aliquid numquam pariatur beatae
                        sit excepturi commodi ut provident ullam et neque totam
                        officiis quibusdam aperiam impedit ipsa voluptates
                        tempora id temporibus cum inventore, rerum distinctio
                        vel. Ad distinctio sit, laborum, perferendis,
                        consequatur molestiae commodi mollitia alias deleniti
                        suscipit in dicta ratione blanditiis nobis numquam
                        aliquam voluptate facere ipsum quidem! Nihil, sed
                        aliquid ab aspernatur magnam pariatur? Delectus at
                        perferendis modi et cupiditate. Numquam pariatur natus a
                        sed, deserunt odio omnis sequi. Eum, aliquid dolores.
                        Atque quisquam nemo quis illo porro minima, deserunt
                        molestiae iure, blanditiis suscipit, placeat quasi
                        commodi. Rem nemo tenetur ea qui dolorem natus impedit
                        cupiditate at sit praesentium quidem ipsam harum eum ad
                        consequuntur, in, ratione cum sequi atque adipisci
                        tempora molestiae nam dignissimos. Qui quaerat
                        reiciendis, quod libero esse eos quae tempora mollitia
                        ipsum, nostrum hic itaque culpa id dicta voluptatum
                        quasi. Reprehenderit aut in sapiente perspiciatis
                        pariatur est dolor, praesentium at eum repellat vero,
                        culpa fugit excepturi quidem explicabo ex labore!
                        Consequuntur, quod.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Journal;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: "5%",
        paddingTop: "1%",
    },
    heading: {
        marginTop: "5%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        width: "35%",
        marginLeft: "auto",
        height: 30,
        borderRadius: 5,
        justifyContent: "space-evenly",
    },
    line: {
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1,
        width: "100%",
        marginTop: "5%",
        opacity: 0.5,
    },
    description: {
        marginTop: "4%",
        padding: "7%",
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
    },
});
