const yt = require('apilessyt')
const types = yt.types;
async function uploadVideoToYoutube(path, metadata) {

  let specs = {
    channelId: "UCd4rz6J8zFS96HTSfyVig3w",                  // Your Channel ID
    video: path,                         // Filepath to the video
    pageOne: {
        title: metadata.title,
        description:metadata.description,
        thumb: string,                      // Filepath to the Thumbnail
        // playlists?: string[];                // Write the name of the (existing)playlists you want to add your video to as a string array
        // madeForKids?: boolean;
        // restrictForAdultsOnly?: boolean;
        // paidPromotion?: boolean;
        // allowAutomaticChapters?: boolean;
        //tags?: string[];                    // Write any tags as an array of strings
    },
    // pageTwo?: {
    //     endcard?: {
    //         enabled: boolean;
    //         import: boolean;                // If the endcard should be imported from another video
    //         importId?: string;              // Defines the videoId of the video where the endcard will be imported from (you can also use the video name)
    //         type?: endcard;                 // Type of the endcard, see types, only needs to be set if you dont import
    //     };
    //     cards?: {
    //         enabled: boolean;
    //         type: card;                     // See types
    //         name: string;                   // name or (reccomended)id of the video/playlist/channel,
    //         message?: string;
    //         teaser?: string;
    //         anyVideo?: boolean;             // Only search your own Videos, or search for any Video on YouTube
    //     };
    // };
    // pageThree?: {};
    pageFour: {
        visibility: types.visibility.PUBLIC         // See types
        // instantPremiere?: boolean;
    },
    // creatorComment?: {                      // You can also add an creator comment to your uploaded video
    //     text: string;
    //     pin?: boolean;
    // };
}

 return  await yt.upload(specs)
}


module.exports = { uploadVideoToYoutube };