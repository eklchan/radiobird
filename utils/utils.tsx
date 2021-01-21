export const formatTime = (time: number) => {
  let hrs = Math.floor(time / 3600);
  let mins = Math.floor((time % 3600) / 60);
  let secs = Math.floor(time % 60);

  let ret = time > 35999 ? '' : '0';
  if (hrs >= 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
};

export function contains(target: string, pattern: Array<string>) {
  let value = 0;
  pattern.forEach(function (word) {
    value = value + Number(target.includes(word));
  });
  return value === 1;
}
