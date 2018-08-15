// @flow

import * as React from "react";
import { withScreenshot } from "storybook-chrome-screenshot";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Box } from "grommet";
import { History, Group } from "grommet-icons";
import * as entityType from "shared/types/entity-type";
import { allWidths } from "testing/screenshot-options";
import * as linkType from "../types/link-type";
import * as wheelchairAccessType from "../types/wheelchair-access-type";
import * as disabledBathroomType from "../types/disabled-bathroom-type";
import * as hearingFacilitiesType from "../types/hearing-facilities-type";
import HeaderImage from "./header-image";
import Header from "./header";
import Aside from "./aside";
import SectionHeading from "./section-heading";
import Description from "./description";
import Notes from "./notes";
import Rating from "./rating";
import DisabilityAccess from "./disability-access";
import ExternalLink from "./external-link";
import Summary from "./summary";
import TagList from "./tag-list";
import IconLinkList from "./icon-link-list";

storiesOf("Entity/HeaderImage", module)
  .addDecorator(withScreenshot(allWidths))
  .addDecorator(story => <Box width="full">{story()}</Box>)
  .add("image", () => (
    <HeaderImage
      entityType={entityType.TALENT}
      images={[
        { id: "9c5f6ba1e500481a97434374089b0539", dominantColor: "0FF" }
      ]}
    />
  ))
  .add("image with copyright", () => (
    <HeaderImage
      entityType={entityType.TALENT}
      images={[
        {
          id: "9c5f6ba1e500481a97434374089b0539",
          dominantColor: "0FF",
          copyright: "Dave Smith"
        }
      ]}
    />
  ));

storiesOf("Entity/Header", module)
  .addDecorator(withScreenshot(allWidths))
  .addDecorator(story => <Box width="full">{story()}</Box>)
  .add("default", () => (
    <Header
      id="talent/foo"
      name="Some Name"
      subTitle="Some Subtitle"
      entityType={entityType.TALENT}
      onEdit={action("onEdit")}
    />
  ));

storiesOf("Entity/Aside", module)
  .addDecorator(withScreenshot())
  .add("with container", () => (
    <Aside.Container>
      <Aside icon={History} title="First">
        Enim laboriosam molestiae eligendi officiis autem itaque nostrum sunt
        reprehenderit
      </Aside>
      <Aside icon={Group} title="Second">
        Expedita accusantium enim
      </Aside>
    </Aside.Container>
  ));

storiesOf("Entity/SectionHeading", module)
  .addDecorator(withScreenshot())
  .addDecorator(story => <Box width="medium">{story()}</Box>)
  .add("default", () => (
    <React.Fragment>
      <SectionHeading title="Some Heading" />
      <Box width="full" height="small" background="#d5e5ff" />
    </React.Fragment>
  ));

storiesOf("Entity/Description", module)
  .addDecorator(withScreenshot())
  .addDecorator(story => <Box width="medium">{story()}</Box>)
  .add("no description", () => <Description />)
  .add("description", () => (
    <Description description="<p>This is a description</p>" />
  ))
  .add("description with weSay", () => (
    <Description
      description="<p>This is a description</p>"
      weSay="This event is sold out!"
    />
  ))
  .add("description with credit", () => (
    <Description
      description="<p>This is a description</p>"
      descriptionCredit="Wikipedia"
    />
  ));

storiesOf("Entity/DisabilityAccess", module)
  .addDecorator(withScreenshot())
  .add("has access link", () => (
    <DisabilityAccess
      wheelchairAccessType={wheelchairAccessType.FULL_ACCESS}
      disabledBathroomType={disabledBathroomType.PRESENT}
      hearingFacilitiesType={hearingFacilitiesType.HEARING_LOOPS}
      links={[{ type: linkType.ACCESS, url: "http://foo.com" }]}
    />
  ))
  .add("no access link", () => (
    <DisabilityAccess
      wheelchairAccessType={wheelchairAccessType.FULL_ACCESS}
      disabledBathroomType={disabledBathroomType.PRESENT}
      hearingFacilitiesType={hearingFacilitiesType.HEARING_LOOPS}
      links={[]}
    />
  ));

storiesOf("Entity/Notes", module)
  .addDecorator(withScreenshot())
  .addDecorator(story => <Box width="medium">{story()}</Box>)
  .add("default", () => (
    <Notes notes="Molestiae sunt tenetur fuga voluptas natus dolores nostrum optio. Corrupti alias quia illo maiores odit aperiam nobis. Qui a odio omnis vero sequi." />
  ));

storiesOf("Entity/ExternalLink", module)
  .addDecorator(withScreenshot())
  .add("default", () => (
    <ExternalLink label="See more here" url="https://duckduckgo.com" />
  ));

storiesOf("Entity/Rating", module)
  .addDecorator(withScreenshot())
  .add("default", () => <Rating rating={3} />);

storiesOf("Entity/Summary", module)
  .addDecorator(withScreenshot())
  .addDecorator(story => <Box width="medium">{story()}</Box>)
  .add("default", () => (
    <Summary summary="Molestiae sunt tenetur fuga voluptas natus dolores nostrum optio. Corrupti alias quia illo maiores." />
  ));

storiesOf("Entity/TagList", module)
  .addDecorator(withScreenshot())
  .add("default", () => (
    <TagList
      styleTags={[{ id: "style/1", label: "some style" }]}
      audienceTags={[{ id: "audience/1", label: "families" }]}
      geoTags={[
        { id: "geo/1", label: "usa" },
        { id: "geo/2", label: "borneo" },
        { id: "geo/3", label: "france" },
        { id: "geo/4", label: "costa rica" }
      ]}
    />
  ));

storiesOf("Entity/IconLinkList", module)
  .addDecorator(withScreenshot())
  .add("default", () => (
    <IconLinkList
      links={[
        { type: linkType.WIKIPEDIA, url: "https://duckduckgo.com" },
        { type: linkType.FACEBOOK, url: "https://duckduckgo.com" },
        { type: linkType.TWITTER, url: "https://duckduckgo.com" },
        { type: linkType.INSTAGRAM, url: "https://duckduckgo.com" },
        { type: linkType.HOMEPAGE, url: "https://duckduckgo.com" }
      ]}
      entityType={entityType.TALENT}
    />
  ));
