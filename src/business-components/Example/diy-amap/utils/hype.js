/**
 * 切换时间线
 * @param {*} timeInSeconds  时间线位置
 * @param {*} timelineName  时间线名
 * @param {*} direction  forward / reverse 顺序 or 倒叙播放
 */
export function goToTimeline() {
	// timeInSeconds = 1,
	// timelineName = 'alert',
	// direction = 'forward'
	// if (!window.hypeDocument) return false;
	// let directionMap = {
	//     forward: hypeDocument.kDirectionForward,
	//     reverse: hypeDocument.kDirectionReverse,
	// };
	// hypeDocument.continueTimelineNamed('主时间线', directionMap[direction]);
	// hypeDocument.goToTimeInTimelineNamed(timeInSeconds, timelineName);
	// hypeDocument.continueTimelineNamed('alert', directionMap[direction]);
}

/**
 * 切换时间线
 * @param {*} timeInSeconds  时间线位置
 * @param {*} timelineName  时间线名
 * @param {*} direction  forward / reverse 顺序 or 倒叙播放
 */
export function goToTimelineService() {
	// timeInSeconds = 1,
	// timelineName = 'dialog',
	// direction = 'forward'
	// if (!window.hypeDocument) return false;
	// hypeDocument.startTimelineNamed('mask');
	// hypeDocument.goToTimeInTimelineNamed(timeInSeconds, timelineName);
	// hypeDocument.continueTimelineNamed(timelineName);
}

/**
 * 切换场景
 * @param {*} sceneName  场景名
 * @param {*} transition     切换动画
 * @param {*} optionalDuration   做数秒内切换
 */
export function goToScene() {
	// sceneName = '首页',
	// transition = 'instant',
	// optionalDuration = 1.1
	// if (!window.hypeDocument) return false;
	// let transitionMap = {
	//     instant: hypeDocument.kSceneTransitionInstant,
	//     fade: hypeDocument.kSceneTransitionCrossfade,
	//     swap: hypeDocument.kSceneTransitionSwap,
	//     pushRight: hypeDocument.kSceneTransitionPushLeftToRight,
	//     pushLeft: hypeDocument.kSceneTransitionPushRightToLeft,
	//     pushTop: hypeDocument.kSceneTransitionPushBottomToTop,
	//     pushBottom: hypeDocument.kSceneTransitionPushTopToBottom,
	// };
	// hypeDocument.showSceneNamed(
	//     sceneName,
	//     transitionMap[transition],
	//     optionalDuration
	// );
}
