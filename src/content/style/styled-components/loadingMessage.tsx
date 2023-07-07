import { StyledLinearProgress, StyledTypography, StyledCard, StyledContainer } from './all';
export default function LoadingMessage() {
  return (
    <StyledContainer>
      <StyledCard>
        <StyledTypography variant="h6" align="center">
          Loading, please wait...
        </StyledTypography>
        <StyledLinearProgress />
      </StyledCard>
    </StyledContainer>
  );
}