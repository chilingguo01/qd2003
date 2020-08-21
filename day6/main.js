//console.log("输出成功");
require.config({
    paths: {
        jquery: "jquery-1.10.1.min",
        bannerImg: "banner",
    }
});
require(["banner"], function(bannerImg){
    bannerImg.banner();
})