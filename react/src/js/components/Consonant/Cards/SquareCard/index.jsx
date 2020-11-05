import React, { useMemo } from 'react';

import { If } from '../../Common';
import { selector } from '../utils';
import { SquareCardType } from '../types';
import { SquareDefaultProps } from '../constants';
import prettyFormatDate from '../../Helpers/prettyFormat';
import {
    useLazyLoading,
    useConfigSelector,
} from '../../Helpers/hooks';

const SquareCard = ({
    id,
    title,
    label,
    ctaLink,
    endTime,
    logoAlt,
    logoSrc,
    videoURL,
    badgeText,
    startTime,
    cardImage,
    bannerIcon,
    description,
    logoBorderColor,
    bannerFontColor,
    bannerDescription,
    logoBackgroundColor,
    bannerBackgroundColor,
}) => {
    const { locale, dateTemlate } = useConfigSelector(selector);

    const imageRef = React.useRef();
    const [lazyLoadedImage] = useLazyLoading(imageRef, cardImage);

    const cardStyles = useMemo(
        () => ({ backgroundImage: `url("${lazyLoadedImage}")` }),
        [lazyLoadedImage],
    );
    const bannerStyle = useMemo(() => ({
        color: bannerFontColor,
        backgroundColor: bannerBackgroundColor,
    }), [bannerFontColor, bannerBackgroundColor]);

    const logoStyle = useMemo(() => ({
        borderColor: logoBorderColor,
        backgroundColor: logoBackgroundColor,
    }), [logoBackgroundColor, logoBorderColor]);

    const detailText = useMemo(
        () => (!startTime ? label : prettyFormatDate(startTime, endTime, locale, dateTemlate))
        , [label, startTime, endTime],
    );

    const shouldRenderBanner = bannerDescription
        && bannerFontColor
        && bannerBackgroundColor;

    return (
        <div
            id={id}
            data-testid="consonant-1-1-card"
            className="consonant-aspect-ratio-1-1-card">
            <div
                ref={imageRef}
                style={cardStyles}
                data-testid="consonant-card--img"
                className="consonant-aspect-ratio-1-1-card--img">
                <If condition={Boolean(shouldRenderBanner)}>
                    <span
                        style={bannerStyle}
                        data-testid="consonant-card--banner"
                        className="consonant-aspect-ratio-1-1-card--banner">
                        <If condition={Boolean(bannerIcon)}>
                            <div className="consonant-aspect-ratio-1-1-card--banner-icon-wrapper">
                                <img
                                    alt=""
                                    loading="lazy"
                                    src={bannerIcon}
                                    data-testid="consonant-card--banner-icon" />
                            </div>
                        </If>
                        <span>{bannerDescription}</span>
                    </span>
                </If>
                <If condition={Boolean(badgeText)}>
                    <span className="consonant-aspect-ratio-1-1-card--badge">
                        {badgeText}
                    </span>
                </If>
                <If condition={Boolean(videoURL)}>
                    <a
                        href={videoURL}
                        target="_blank"
                        rel="noreferrer"
                        className="consonant-aspect-ratio-1-1-card--video-ico"
                        tabIndex="0">
                        {videoURL}
                    </a>
                </If>
                <If condition={Boolean(logoSrc)}>
                    <div
                        style={logoStyle}
                        className="consonant-aspect-ratio-1-1-card--logo">
                        <img src={logoSrc} alt={logoAlt} loading="lazy" width="32" />
                    </div>
                </If>
            </div>
            <a
                href={ctaLink}
                target="_blank"
                rel="noreferrer"
                title="Click to open in a new tab"
                className="consonant-aspect-ratio-1-1-card--inner"
                tabIndex="0">
                <If condition={Boolean(detailText)}>
                    <span
                        data-testid="1-1-card--label"
                        className="consonant-aspect-ratio-1-1-card--label">
                        {detailText}
                    </span>
                </If>
                <If condition={Boolean(title)}>
                    <h2 className="consonant-aspect-ratio-1-1-card--title">{title}</h2>
                </If>
                <If condition={Boolean(description)}>
                    <p className="consonant-aspect-ratio-1-1-card--text">{description}</p>
                </If>
            </a>
        </div>
    );
};

SquareCard.propTypes = SquareCardType;
SquareCard.defaultProps = SquareDefaultProps;

export default SquareCard;