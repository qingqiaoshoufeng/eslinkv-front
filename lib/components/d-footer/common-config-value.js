const commonConfigValue = () => Object.freeze({
    widget: {
        name: '',
        id: Date.now(),
        remark: '',
		componentVersion: '',
        locked: false,
        hide: false,
        combinationTo: ''
    },
    layout: {
        size: {
            width: 300,
            height: 200,
            unit: 'px',
            range: {
                minWidth: 0,
                maxWidth: 0,
                minHeight: 0,
                maxHeight: 0,
                rangeUnit: '%'
            }
        },
        position: {
            value: 'absolute',
            unit: 'px',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        font: {
            size: 15,
            unit: 'px',
            color: '#000000',
            align: 'center',
            weight: '',
            letterSpacing: 0,
            letterSpacingUnit: '',
            whiteSpace: '',
            family: '',
            lineHeight: 1.5,
            lineHeightUnit: 'em',
            indent: 0,
            indentUnit: '',
            decorationLine: '',
            decorationColor: '',
            decorationStyle: ''
        },
        background: {
            url: '',
            size: 'cover',
            position: 'center',
            repeat: 'no-repeat',
            color: '',
            blendMode: '',
            contentBlendMode: ''
        },
        border: {
            width: 0,
            unit: 'px',
            color: 'cyan',
            style: 'solid',
            topLeftRadius: 0,
            topRightRadius: 0,
            bottomRightRadius: 0,
            bottomLeftRadius: 0,
            radiusUnit: 'px',
            detail: {
                leftWidth: 0,
                leftUnit: '',
                leftColor: '',
                leftStyle: '',
                rightWidth: 0,
                rightUnit: '',
                rightColor: '',
                rightStyle: '',
                topWidth: 0,
                topUnit: '',
                topColor: '',
                topStyle: '',
                bottomWidth: 0,
                bottomUnit: '',
                bottomColor: '',
                bottomStyle: ''
            }
        },
        padding: {
            value: 0,
            unit: 'px',
            detail: {
                left: 0,
                leftUnit: '',
                right: 0,
                rightUnit: '',
                top: 0,
                topUnit: '',
                bottom: 0,
                bottomUnit: ''
            }
        },
        margin: {
            value: 0,
            unit: 'px',
            detail: {
                left: 0,
                leftUnit: '',
                right: 0,
                rightUnit: '',
                top: 0,
                topUnit: '',
                bottom: 0,
                bottomUnit: ''
            }
        },
        shadow: {
            color: '',
            offsetX: 0,
            offsetY: 0,
            unit: 'px',
            blurRadius: 10,
            blurUnit: '',
            spreadRadius: 0,
            spreadUnit: '',
            inset: false
        },
        zIndex: 10,
        opacity: 1,
        custom: ''
    },
    config: {
        option: {
            style: {
                fill: '#3de7c9',
                stroke: 'rgba(255,255,255,0)',
                opacity: 1,
                lineWidth: 0,
                lineCap: '',
                lineJoin: '',
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: '#000000',
                rotate: 0,
                fontStyle: '',
                fontVarient: '',
                fontWeight: '',
                fontSize: 42,
                fontFamily: 'Microsoft Yahei',
                textAlign: '',
                textBaseline: ''
            }
        },
        className: ''
    },
    api: {
        url: '',
        method: 'GET',
        params: '',
        path: 'data',
        data: '',
        autoFetch: {
            enable: false,
            duration: 5000
        },
        check: {
            enable: true,
            key: 'status',
            value: 200,
            type: 'Number'
        },
        system: {
            enable: false,
            interface: 'api/impalaByQueryId',
            method: 'GET',
            path: 'data',
            check: {
                enable: true,
                key: 'responseCode',
                value: '100000',
                type: 'String'
            },
            params: {
                chartCondition: '',
                analyseCondition: '',
                chartQueryType: '',
                dataAnalyseId: '',
                databaseId: '',
                databaseType: '',
                databaseName: '',
                dataSourceId: '',
                dataType: '',
                executeSql: '',
                projectId: '',
                tableId: '',
                tableName: ''
            }
        },
        globalApiConfig: {
            enable: false,
            variables: [],
            variable: []
        },
        process: {
            enable: false,
            methodBody: ''
        },
        bind: {
            enable: false,
            role: [],
            refIds: [],
            params: [],
        },
        dimensionAndQuota: {
            enable: false,
            index: '0',
            fieldsSource: [],
            dimensionFields: [],
            quotaFields: [],
            dimensions: [],
            quotas: []
        },
        dataShareConfig: {
            enable: false,
            role: '',
            shareVariable: '',
            shareProcessedData: '1',
            shareVariables: [],
            useVariable: []
        },
        crossFrameParamsBind: {
            params: []
        }
    },
    animation: {
        transitionEnable: true,
        enter: 'fadeIn',
        // leave: 'fadeOut',
        delay: 0,
        duration: 600
    }
})

export default commonConfigValue
