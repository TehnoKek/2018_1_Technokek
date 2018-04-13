# GAME API

* _Многие названия сокращаются для оптимизации размера запроса. Будут приводиться расшифровки, но они нужны только для понимания. Использовать нужно сокаращенные варианты_

* **Формат сообщения:**
    ```javascript
    {
        name: 'gm:smth:etc', // имя события
        payload: {
            // payload data
        }
    }
    ```

## **СОБЫТИЯ**

* **ПРЕФИКС** Все игровые события начинаются с **`gm:`**

### События состояния игры

* **ПРЕФИКС** **`gm:stt`**, где "stt" означает "state"

* **Начало игры**
    ```javascript
    {
        name: 'gm:stt:start',
        payload: {
            mode: GAME_MODE,
            stations: [
                /* initial stations */
            ],
            resources: [
                /* initial resources */
            ]
        }
    }
    ```
    `GAME_MODE` может иметь слудеющие значения:
    1. SINGLEPLAYER: `'single'`
    2. MULTIPLAYER: `'multi'`

* **Конец игры**
    ```javascript
    {
        name: 'gm:stt:end',
        payload: {
            reason: REASON_TYPE,
            score: 1200
        }
    }
    ```
    `REASON_TYPE` может иметь слудеющие значения:
    1. LOSE: `'lose'` - проигрыш
    2. PARENT_LEAVE `'partner:leave'` - игра покинута другим игроком
    3. ME_LEAVE `'me:leave'` - игра покинута ткущим игроком
    4. DISCONNECT `'disconnect'` - соединение разорвано

### События CUR // create, update, remove

* **Добавления станции**
    ```javascript
    {
        name: 'gm:crt:station',
        payload: {
            id: 1,
            x_pos: 10,
            y_pos: 10,
            type: STATION_TYPE,
            state: STAION_STATE
            capacity: 12 // Вместимость
        }
    }
* **Изменения станции**
    ```javascript
    {
        name: 'gm:upd:station',
        payload: {
            id: 1,
            state: STATION_STATE
        }
    }
    ```

    `STATION_TYPE` может иметь слудеющие значения:
    1. TRIANGLE: `'trg'` - треугольная
    2. SQUARE: `'sqr'` - квадратная
    3. CIRCLE: `'crl'` - круглая

    `STATION_TYPE` может иметь слудеющие значения:
    1. OK: `'ok'` - все хорошо
    2. WARNING: `'wrn'` - сильно заполнена
    3. DANGER: `'dgr'` - слишком сильно заполнена
    4. LOSE: `'ls'` - является причиной проигрыша

* **Добавления пассажира**
    ```javascript
    {
        name: 'gm:crt:passenger',
        payload: {
            id: 1,
            station_id: 1,
            goal: STATION_TYPE
        }
    }
* **Изменение пассажира**
    ```javascript
    {
        name: 'gm:upd:pssenger',
        payload: {
            id: 1,
            parent: {
                id: 1,
                type: PARENT_TYPE
            }
        }
    }
    ```
    `PARENT_TYPE` может иметь слудеющие значения:
    1. STATION: `'station'` - пассажир находится на станции
    2. TRAIN: `'train'` - пассажир находится в поезде
* **Удаление пассажира**
    ```javascript
    {
        name: 'gm:rm:passenger',
        payload: {
            id: 1
        }
    }
    ```

* **Добавление перегона метро**
    ```javascript
    {
        name: 'gm:crt:segment',
        payload: {
            id: 1,
            line_id: 1,
            st1_id: 1, // id одной станции
            st2_id: 2  // id другой станции
            // для удобства st1_id < st2_id
        }
    }
    ```

* **Удаление перегона метро**
    ```javascript
    {
        name: 'gm:crt:segment',
        payload: {
            id: 1
        }
    }
    ```

* **Добавление поезда**
    ```javascript
    {
        name: 'gm:crt:train',
        payload: {
            id: 1,
            segment_id: 1,
            stage: 0.2 // real [0; 1)
            dir: DIRECTION_TYPE
        }
    }
    ```
    `DIRECTION_TYPE` может иметь слудеющие значения:
    2. FRONT: `'frnt'` - туда - если движется в сторону станции с большим id
    1. BACK: `'bck'` - сюда - если движется в сторону станции с меньшим id
* **Изменение поезда**. _отличие только в названии события_
    ```javascript
    {
        name: 'gm:upd:train',
        payload: {
            id: 1,
            segment_id: 1,
            stage: 0.2 // real [0; 1)
            dir: DIRECTION_TYPE
        }
    }
    ```
* **Удаление поезда**
    ```javascript
    {
        name: 'gm:rm:train',
        payload: {
            id: 1,
        }
    }
    ```

### События добавления ресурсов

```javascript
{
    name: 'gm:crt:res',
    payload: {
        type: RESOURCE_TYPE
        id: 1
    }
}
```

`RESOURCE_TYPE` может иметь следующие значения:

1. TRAIN: `'train'` - новый поезд
2. LINE: `'line'` - новая линия

### События, испускаемые пользователем. Префикс: **`gm:ask`**

* Запрос на создание перегона метро
    ```javascript
    {
        name: 'gm:ask:crt:segment',
        payload: {
            line_id: 1,
            st1_id: 1, // id одной станции
            st2_id: 2  // id другой станции
        }
    }
    ```
* Запрос на удаление перегона метро,
    ```javascript
    {
        name: 'gm:ask:rm:segment',
        payload: {
            segment_id: 1
        }
    }
    ```
* Запрос на установку поезда
    ```javascript
    {
        name: 'gm:ask:crt:train',
        payload: {
            id: 1,
            station_id: 1,
            line_id: 1,
            dir: DIRECTION_TYPE
        }
    }
    ```
* Запрос на удаление поезда
    ```javascript
    {
        name: 'gm:ask:rm:train',
        payload: {
            id: 1
        }
    }
    ```
* Запрос на перемещение поезда
    ```javascript
    {
        name: 'gm:ask:upd:train',
        payload: {
            id: 1,
            dest: {
                station_id: 2,
                line_id: 1,
                dir: DIRECTION_TYPE
            }
        }
    }
    ```