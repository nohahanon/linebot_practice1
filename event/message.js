// ファイル読み込み
// import { audioEvent } from './message/audio.js';
// import { fileEvent } from './message/file.js';
// import { imageEvent } from './message/image.js';
// import { locationEvent } from './message/location.js';
// import { stickerEvent } from './message/sticker.js';
// import { textEvent } from './message/text.js';
// import { videoEvent } from './message/video.js';

import fetch from 'node-fetch';

// メッセージイベントが飛んできた時に呼び出される
// export default async (event, client) => {
export default async () => {
  // メッセージタイプごとの条件分岐
  // switch (event.message.type) {
  //   case 'text': {
  //     // テキストの場合はtextEventを呼び出す
  //     // 実行結果をmessageに格納する
  //     message = textEvent(event, client);
  //     break;
  //   }
  //   case 'image': {
  //     // イメージの場合はimageEventを呼び出す
  //     // 実行結果をmessageに格納する
  //     message = imageEvent(event, client);
  //     break;
  //   }
  //   case 'video': {
  //     // ビデオの場合はvideoEventを呼び出す
  //     // 実行結果をmessageに格納する
  //     message = videoEvent(event, client);
  //     break;
  //   }
  //   case 'audio': {
  //     // オーディオの場合はaudioEventを呼び出す
  //     // 実行結果をmessageに格納する
  //     message = audioEvent(event, client);
  //     break;
  //   }
  //   case 'file': {
  //     // ファイルの場合はfileEventを呼び出す
  //     // 実行結果をmessageに格納する
  //     message = fileEvent(event, client);
  //     break;
  //   }
  //   case 'location': {
  //     // 位置情報の場合はlocationEventを呼び出す
  //     // 実行結果をmessageに格納する
  //     message = locationEvent(event);
  //     break;
  //   }
  //   case 'sticker': {
  //     // スタンプの場合はstickerEventを呼び出す
  //     // 実行結果をmessageに格納する
  //     message = stickerEvent(event);
  //     break;
  //   }
  //   // それ以外の場合
  //   default: {
  //     // 返信するメッセージを作成
  //     message = {
  //       type: 'text',
  //       text: 'そのイベントには対応していません...',
  //     };
  //     break;
  //   }
  // }

  const message = {
    type: 'text',
    text: '',
  };
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=37.4947&longitude=139.9298&hourly=precipitation_probability&timezone=Asia%2FTokyo&forecast_days=1';
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // message.text = JSON.stringify(data.hourly);
      let str = '';
      let flag = 0;
      for (let i = 0; i < 24; i += 1) {
        // str += data.hourly.time[i] + ' :\t' + data.hourly.precipitation_probability[i] + '\n'
        str = `${str}${data.hourly.time[i]} :\t${data.hourly.precipitation_probability[i]}\n`;
        if (data.hourly.precipitation_probability[i] >= 70) flag = 1;
      }
      if (flag) str += '雨降るぞ';
      message.text = str;
    })
    .catch((error) => {
      console.error('エラーが発生しました:', error);
    });

  // 関数の呼び出し元（bot.jsのindex）に返信するメッセージを返す
  return message;
};
