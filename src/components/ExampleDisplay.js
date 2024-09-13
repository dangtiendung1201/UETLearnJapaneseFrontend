import React, { useState, useEffect } from 'react';
import WordItem from '../components/WordItem'
import { TiPlus } from "react-icons/ti";

const ExampleDisplay = ({meanings, listId}) => {
    const [wordList, setWordList] = useState([])
    console.log("listId", listId)

    useEffect(() => {
        getWord();
        // eslint-disable-next-line
    }, [listId]);

    const getWord = async () => {
        let response = await fetch(`/api/flashcard/${listId}/`);
        let data = await response.json();
        setWordList(data.words);
    };

    // Hàm kiểm tra xem từ đã có trong danh sách words hay chưa
    const isWordInList = (word) => {
        console.log("check:", word, wordList)
        return wordList.some((w) => w.w === word.w);
    };

    return (
        <div>
            <div>
                <p className="font-bold text-lg">
                    Ví dụ
                </p>
                {meanings.examples && meanings.examples.length > 0 ? (meanings.examples.map((example, index) => (
                    <div key={index} className='flex flex-row items-center hover:bg-gray-200 rounded-xl'>
                        <WordItem word={example} className='flex flex-row flex-grow p-1 text-justify' />
                        {!isWordInList(example) && ( // Chỉ hiển thị TiPlus nếu từ không có trong danh sách words
                            <TiPlus className='flex-shrink-0 text-dark-green text-2xl cursor-pointer' />
                        )}
                    </div>
                ))
                ) : (
                    <p></p>
                )}
            </div>
            <div className="kun_on_reading_guide">
                <h1 className="font-bold text-lg my-2">
                    Ví dụ phân loại theo cách đọc
                </h1>
                <div>
                    <p className="font-semibold text-lg w-auto bg-[#C8FFD4] p-2 rounded-xl">
                        Kunyomi
                    </p>
                        {meanings.example_kun && Object.keys(meanings.example_kun).length > 0 ? (Object.keys(meanings.example_kun).map((key) => (
                            <div key={key}>
                                <h2 className="inline-block font-semibold text-lg w-auto text-red-500 pt-3 pb-1">{key}</h2>
                                <ul>
                                    {meanings.example_kun[key].map((example, index) => (
                                        <div key={index} className='flex flex-row items-center hover:bg-gray-200 rounded-xl'>
                                            <WordItem word={example} className='flex flex-row flex-grow p-1 text-justify' />
                                            {!isWordInList(example) && ( // Chỉ hiển thị TiPlus nếu từ không có trong danh sách words
                                                <TiPlus className='flex-shrink-0 text-dark-green text-2xl cursor-pointer' />
                                            )}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        ))
                        ) : (
                            <p></p>
                    )}
                </div>

                <div>
                    <p className="font-semibold text-lg w-auto bg-[#C8FFD4] p-2 rounded-xl mt-6">
                        Onyomi
                    </p>
                        {meanings.example_on && Object.keys(meanings.example_on).length > 0 ? (Object.keys(meanings.example_on).map((key) => (
                            <div key={key}>
                                <h2 className="inline-block font-semibold text-lg w-auto text-red-500 pt-3 pb-1">{key}</h2>
                                <ul>
                                    {meanings.example_on[key].map((example, index) => (
                                        <div key={index} className='flex flex-row items-center hover:bg-gray-200 rounded-xl'>
                                            <WordItem word={example} className='flex flex-row flex-grow p-1 text-justify' />
                                            {!isWordInList(example) && ( // Chỉ hiển thị TiPlus nếu từ không có trong danh sách words
                                                <TiPlus className='flex-shrink-0 text-dark-green text-2xl cursor-pointer' />
                                            )}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        ))
                        ) : (
                            <p></p>
                        )}
                </div>
            </div>
        </div>
    )
}

export default ExampleDisplay